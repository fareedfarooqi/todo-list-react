import TaskInput from "../TaskInput/TaskInput";
import TaskItem from "../TaskItem/TaskItem";
import styles from './TaskList.module.css'
import React, {useState} from 'react'
import { v4 as uuidv4 } from 'uuid';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    const addTask = (taskInput) => {
        const taskId = uuidv4();

        const newTask = {
            id: taskId,
            text: taskInput
        };

        setTasks([...tasks, newTask]);
    }

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    const moveUpTask = (taskId) => {
        const index = tasks.findIndex(task => task.id === taskId);

        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index - 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index - 1]];
            setTasks(updatedTasks)
        }
    }

    const moveDownTask = (taskId) => {
        const index = tasks.findIndex(task => task.id === taskId);

        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return(
        <>
			<TaskInput onAddTask={addTask}/>
            <div className={styles.task_list}>
                {tasks.map((task) => (
                    <TaskItem 
                        key={task.id} 
                        task={task} 
                        onDelete={deleteTask} 
                        onMoveUp={moveUpTask} 
                        onMoveDown={moveDownTask}
                    />
                ))}
            </div>
        </>
    )
}

export default TaskList;