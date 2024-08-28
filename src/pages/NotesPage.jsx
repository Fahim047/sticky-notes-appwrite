import { useContext } from 'react';
import NoteCard from '../components/NoteCard';
import { NoteContext } from '../context/NoteContext';
import Controls from '../components/Controls';
const NotesPage = () => {
	const { notes } = useContext(NoteContext);
	return (
		<div>
			<Controls />
			{notes.map((note) => (
				<NoteCard key={note.$id} note={note} />
			))}
		</div>
	);
};

export default NotesPage;
