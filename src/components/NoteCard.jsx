import { useRef, useEffect, useState } from 'react';
import TrashIcon from '../icons/TrashIcon';
import { autoGrow, bodyParser, setNewOffset, setZIndex } from '../utils';
import { db } from '../appwrite/databases';
import Spinner from '../icons/Spinner';

const NoteCard = ({ note }) => {
	const [saving, setSaving] = useState(false);
	const keyUpTimer = useRef(null);
	const body = bodyParser(note.body);
	const colors = JSON.parse(note.colors);

	const [position, setPosition] = useState(JSON.parse(note.position));
	const cardRef = useRef(null);
	const textAreaRef = useRef(null);

	let mouseStartPos = { x: 0, y: 0 };

	useEffect(() => {
		autoGrow(textAreaRef);
	}, []);

	const mouseDown = (e) => {
		mouseStartPos.x = e.clientX;
		mouseStartPos.y = e.clientY;

		document.addEventListener('mousemove', mouseMove);
		document.addEventListener('mouseup', mouseUp);

		setZIndex(cardRef.current);
	};

	const mouseMove = (e) => {
		// calculate mouse move direction
		let mouseMoveDir = {
			x: mouseStartPos.x - e.clientX,
			y: mouseStartPos.y - e.clientY,
		};
		// update mouse move start position for next move
		mouseStartPos.x = e.clientX;
		mouseStartPos.y = e.clientY;

		// set new position for the card
		const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
		setPosition(newPosition);
	};

	const mouseUp = () => {
		document.removeEventListener('mousemove', mouseMove);
		document.removeEventListener('mouseup', mouseUp);

		const newPosition = setNewOffset(cardRef.current);
		saveData('position', newPosition);
	};
	const saveData = async (key, value) => {
		const payload = {
			[key]: JSON.stringify(value),
		};
		try {
			await db.notes.update(note.$id, payload);
		} catch (error) {
			console.error(error);
		}
		setSaving(false);
	};

	const handleKeyUp = async () => {
		setSaving(true);

		if (keyUpTimer.current) {
			clearTimeout(keyUpTimer.current);
		}
		keyUpTimer.current = setTimeout(() => {
			saveData('body', textAreaRef.current.value);
		}, 2000);
	};
	return (
		<div
			ref={cardRef}
			className="card"
			style={{
				backgroundColor: colors.colorBody,
				left: `${position.x}px`,
				top: `${position.y}px`,
			}}
		>
			<div
				className="card-header"
				style={{ backgroundColor: colors.colorHeader }}
				onMouseDown={mouseDown}
			>
				<TrashIcon />
				{saving && (
					<div className="card-saving">
						<Spinner color={colors.colorText} />
						<span style={{ color: colors.colorText }}>
							Saving...
						</span>
					</div>
				)}
			</div>
			<div className="card-body">
				<textarea
					ref={textAreaRef}
					style={{ color: colors.colorText }}
					defaultValue={body}
					onInput={() => autoGrow(textAreaRef)}
					onFocus={() => setZIndex(cardRef.current)}
					onKeyUp={handleKeyUp}
				></textarea>
			</div>
		</div>
	);
};

export default NoteCard;
