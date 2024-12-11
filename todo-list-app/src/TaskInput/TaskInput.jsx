import React, {useState} from 'react'
import styles from './TaskInput.module.css'

function TaskInput({ onAddTask }) {
    const [inputValue, setInputValue] = useState("");

    const handleAdd = () => {
        if (inputValue.trim()) {
            onAddTask(inputValue);
            setInputValue("");
        }
    }

    return(
        <>
            <div className={styles.task_input}>
                <input 
                    type="text" className={styles.input_text} 
                    placeholder="Enter a task..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}

                />
                <button className={styles.button_add} onClick={handleAdd}>Add</button>
            </div>
        </>
    )
}

export default TaskInput;
