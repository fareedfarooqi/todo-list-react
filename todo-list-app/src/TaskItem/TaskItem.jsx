import styles from './TaskItem.module.css'
import React from 'react'

function TaskItem({ task, onDelete, onMoveUp, onMoveDown }) {
    return(
        <>
            <div key={task.id} className={styles.task_item}>
                <div className={styles.task_text}>{task.text}</div>
                <div className={styles.button_container}>
                    <button className={styles.delete_button} onClick={() => onDelete(task.id)}>🗑️</button>
                    <button className={styles.up_button} onClick={() => onMoveUp(task.id)}>⬆️</button>
                    <button className={styles.down_button} onClick={() => onMoveDown(task.id)}>⬇️</button>
                </div>
            </div>
        </>
    );
}

export default TaskItem;