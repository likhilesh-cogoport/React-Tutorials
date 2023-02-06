import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'
export default function Navbar(props) {
  return (
    <div className={styles.navbar}>
      <div>
        {
          props.home&&<Link to='/' className={styles.btn}>Home</Link>
        }
        {
          props.liked&&<Link to="/liked-movies" className={styles.btn}>Liked Movies</Link>
        }
      </div>
    </div>
  )
}
