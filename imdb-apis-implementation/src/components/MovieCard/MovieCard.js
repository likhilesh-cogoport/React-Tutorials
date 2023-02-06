import React from 'react'
import LikeButton from '../LikeButton'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'
export default function MovieCard(props) {
  return (
    <div className={styles.cardBox}>
        <img src={`${props.data.Poster}`} width="300px"/>
        <div className={styles.cardTitle}>
            {(props.data.Title).substring(0,36)}{props.data.Title.length>36?' ...':''}
        </div>
        <div className={styles.bottomBar}>
            <div className={styles.year}>
                {(props.data.Type).toUpperCase()}{'('}{props.data.Year}{')'}
            </div>
            <div className={styles.likeBtn}>
                <LikeButton flag={props.data.like} addLike={props.addLike}/>
            </div>
        </div>
        <Link to={`/movie/${props.data.imdbID}`} className={styles.showMore}>
            Show More
        </Link>
    </div>
  )
}

{/* <li key={m.imdbID+`${m.like}`}>
                  {m.Title} <br/>
                  {m.Year} <br/>
                  <LikeButton flag={m.like} addLike={()=>addLike(m)}/>
                </li> */}
