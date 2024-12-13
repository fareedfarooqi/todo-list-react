import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from './TaskItem.module.css';

function TaskItem({ task, onDelete, onEdit, onMoveUp, onMoveDown }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
    
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    const toggleComplete = () => {
        setIsCompleted(!isCompleted);
    };

    return (
        <div
            ref={setNodeRef}
            {... attributes}
            {... listeners}
            style={style}
            className={styles.task_item}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && (
                <input
                    type="checkbox"
                    className={styles.checkbox}
                    onChange={toggleComplete}
                    checked={isCompleted}
                />
            )}
            <div
                className={`${styles.task_text} ${
                    isCompleted ? styles.completed : ''
                }`}
            >
                {task.text}
            </div>
            <div className={styles.button_container}>
                <button className={styles.up_button} onClick={() => onMoveUp(task.id)}>⬆️</button>
                <button className={styles.down_button} onClick={() => onMoveDown(task.id)}>⬇️</button>
                <button className={styles.edit_button} onClick={() => onEdit(task.id)}>✏️</button>
                <button className={styles.delete_button} onClick={() => onDelete(task.id)}>🗑️</button>
            </div>
        </div>
    );
}

export default TaskItem;