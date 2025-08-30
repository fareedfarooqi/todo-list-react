import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./TaskItem.module.css";

function TaskItem({ task, onDelete, onEdit, onMoveUp, onMoveDown }) {
    const [isCompleted, setIsCompleted] = useState(false);

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const toggleComplete = () => {
        setIsCompleted(!isCompleted);
    };

    return (
        <div ref={setNodeRef} style={style} className={styles.task_item}>
            <div 
                {...attributes} 
                {...listeners} 
                className={styles.draggable_area}
            >
                <div
                    className={`${styles.task_text} ${isCompleted ? styles.completed : ""}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {task.text}
                </div>
            </div>

            <input
                type="checkbox"
                className={styles.checkbox}
                onChange={toggleComplete}
                checked={isCompleted}
            />

            <div className={styles.button_container}>
                <button
                    className={styles.up_button}
                    onClick={(e) => {
                        e.stopPropagation();
                        onMoveUp();
                    }}
                >
                    ⬆️
                </button>
                <button
                    className={styles.down_button}
                    onClick={(e) => {
                        e.stopPropagation();
                        onMoveDown();
                    }}
                >
                    ⬇️
                </button>
                <button
                    className={styles.edit_button}
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(task.id);
                    }}
                >
                    ✏️
                </button>
                <button
                    className={styles.delete_button}
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(task.id);
                    }}
                >
                    🗑️
                </button>
            </div>
        </div>
    );
}

export default TaskItem;
