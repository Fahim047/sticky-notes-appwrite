import { db } from '../appwrite/databases';
import TrashIcon from '../icons/TrashIcon';
const DeleteButton = ({ noteId, setNotes }) => {
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
