import TaskInput from "../TaskInput/TaskInput";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./TaskList.module.css";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    const addTask = (taskInput) => {
        const taskId = uuidv4();
        const newTask = { id: taskId, text: taskInput };
        setTasks([...tasks, newTask]);
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    const moveTaskUp = (index) => {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index - 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index - 1]];
            setTasks(updatedTasks);
        }
    };

    const moveTaskDown = (index) => {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    };

    const openEditModal = (taskId) => {
        const task = tasks.find((task) => task.id === taskId);
        setIsEditing(true);
        setTaskToEdit(task);
    };

    const saveTaskEdit = (newText) => {
        setTasks(tasks.map((task) => (task.id === taskToEdit.id ? { ...task, text: newText } : task)));
        setIsEditing(false);
        setTaskToEdit(null);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) return;

        if (active.id !== over.id) {
            const oldIndex = tasks.findIndex((task) => task.id === active.id);
            const newIndex = tasks.findIndex((task) => task.id === over.id);
            setTasks(arrayMove(tasks, oldIndex, newIndex));
        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
            <TaskInput onAddTask={addTask} />
            <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
                <div className={styles.task_list}>
                    {tasks.map((task, index) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            index={index}
                            onDelete={deleteTask}
                            onEdit={openEditModal}
                            onMoveUp={() => moveTaskUp(index)}
                            onMoveDown={() => moveTaskDown(index)}
                        />
                    ))}
                </div>
            </SortableContext>
            {isEditing && (
                <div className={styles.modal_overlay} onClick={() => setIsEditing(false)}>
                    <div className={styles.modal_box_area} onClick={(e) => e.stopPropagation()}>
                        <h3>Edit Task</h3>
                        <input
                            type="text"
                            className={styles.input_text}
                            value={taskToEdit.text}
                            onChange={(e) => setTaskToEdit({ ...taskToEdit, text: e.target.value })}
                        />
                        <div className={styles.modal_buttons}>
                            <button onClick={() => setIsEditing(false)}>Cancel</button>
                            <button onClick={() => saveTaskEdit(taskToEdit.text)}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </DndContext>
    );
}

export default TaskList;
