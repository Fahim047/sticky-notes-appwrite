import NoteProvider from './context/NoteContext';
import NotesPage from './pages/NotesPage';

const App = () => {
	return (
		<div id="app">
			<NoteProvider>
				<NotesPage />
			</NoteProvider>
		</div>
	);
};

export default App;
