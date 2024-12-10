import styles from './TaskInput.module.css'

function TaskInput() {

    return(
        <>
            <div className={styles.task_input}>
                <input type="text" className={styles.input_text} placeholder="Enter a task..."/>
                <button className={styles.button_add}>Add</button>
            </div>
        </>
    )
}

export default TaskInput;