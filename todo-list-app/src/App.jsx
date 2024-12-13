import { DndContext, closestCorners } from '@dnd-kit/core';
import Header from './Header/Header.jsx'
import TaskInput from './TaskInput/TaskInput.jsx'
import TaskList from './TaskList/TaskList.jsx';

function App() {

    return(
		<>
			<Header />
			<TaskList />
		</>
	);
}

export default App
