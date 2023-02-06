import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Titlebar from './components/Titlebar';
import Navbar from './components/Navbar';
import styles from './MovieStyles.module.css';

export default function Movie() {
    const param = useParams();
    const [movieData, setMovieData] = useState()
    useEffect(() => {
      axios.get(`http://www.omdbapi.com/?i=${param.id}&apikey=3c2e5580`).then((d)=>{
        console.log(d.data);
        setMovieData(d.data);
      })
    }, [])
    
  return (
    <div className={styles.univ}>
        <Titlebar/>
        <Navbar/>
        {
            movieData?
            <>
                <div className={styles.main}>
                    <div className={styles.part1}>
                        <img src={`${movieData.Poster}`} width="300px"/>
                    </div>
                    <div className={styles.part2}>
                        <div className={styles.title1}>
                            {`${movieData.Title} (${movieData.Type.toUpperCase()})`}
                        </div>
                        <div className={styles.genC1}>
                            Country: {movieData.Country}
                        </div>
                        <div className={styles.genC1}>
                            Genre: {movieData.Genre}
                        </div>
                        <div className={styles.genC1}>
                            IMDB Rating: {movieData.imdbRating}
                        </div>
                        <div className={styles.genC2}>
                            {
                                movieData.Ratings.map((d)=>{
                                    return(
                                        <li>{d.Source} : {d.Value}</li>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </>
            :'Loading ...'
        }
    </div>
  )
}
