import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'
export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div>
        <Link to='/' className={styles.btn}>Home</Link>
        <Link to="/liked-movies" className={styles.btn}>Liked Movies</Link>
      </div>
    </div>
  )
}
