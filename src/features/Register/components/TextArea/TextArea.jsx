import React from 'react';
import styles from './TextArea.module.css';
const Textarea = () => {
  return (
    <div className={styles.container}>
      <form>
        <div className={styles.textAreaStyle}>
          <textarea
            className={styles.textArea}
            row="4"
            cols="37"
            maxlength="100"
            minlength="3"
            placeholder="Write your description"
          ></textarea>
        </div>
        <span className={styles.textAreaCount}></span>
      </form>
    </div>
  );
};

export default Textarea;
