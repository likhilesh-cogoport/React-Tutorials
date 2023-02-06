import React, { useState } from 'react'
import styles from './styles.module.css';

export default function LikeButton(props) {
    // const [value, setValue] = useState(props.value)
  return (
    <>
        <button 
        onClick={()=>{props.addLike()}} 
        className={`${props.flag?styles.activeBtn:styles.passiveBtn}`}
        >
            {props.flag?'Unlike':'Like'}
        </button>
        {/* {
            props.flag==1?
            <button 
            onClick={()=>{props.addLike}} 
            // className={styles.activeBtn}
            >unLike</button>:
            <button 
            onClick={()=>{props.addLike}} 
            // className={styles.PassiveBtn}
            >Like</button>
        } */}
    </>
  )
}
