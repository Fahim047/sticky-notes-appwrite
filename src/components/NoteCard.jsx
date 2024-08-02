import { useRef, useEffect, useState } from 'react';
import TrashIcon from '../icons/TrashIcon';
import { autoGrow, bodyParser, setNewOffset, setZIndex } from '../utils';

const NoteCard = ({ note }) => {
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
			</div>
			<div className="card-body">
				<textarea
					ref={textAreaRef}
					style={{ color: colors.colorText }}
					defaultValue={body}
					onInput={() => autoGrow(textAreaRef)}
					onFocus={() => setZIndex(cardRef.current)}
				></textarea>
			</div>
		</div>
	);
};

export default NoteCard;
