import { useContext } from 'react';
import { db } from '../appwrite/databases';
import TrashIcon from '../icons/TrashIcon';
import { NoteContext } from '../context/NoteContext';
const DeleteButton = ({ noteId }) => {
	const { setNotes } = useContext(NoteContext);
	const handleDelete = async () => {
		db.notes.delete(noteId);
		setNotes((prevState) =>
			prevState.filter((note) => note.$id !== noteId)
		);
	};
	return (
		<button onClick={handleDelete}>
			<TrashIcon />
		</button>
	);
};

export default DeleteButton;
