import axios from 'axios';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import LikeButton from './components/LikeButton';
import MovieCard from './components/MovieCard/MovieCard';
import styles from './styles.module.css'
import { Link } from 'react-router-dom';
import Titlebar from './components/Titlebar';
import Navbar from './components/Navbar';

function LikedMovies(){
  const [movies, setMovies] = useState([]);
  const [likes, setLikes] = useState([])

  useEffect(() => {
    let data= localStorage.getItem("likes");
    if(data){
      data=JSON.parse(data);
      console.log(data)
      data=data.map((d)=>{
        d.like=true;
        return d;
      })
      setMovies(data);
    }
  }, [])

  function disLike(val){
    let likes_temp=movies.filter((l)=>l.imdbID!=val.imdbID);
    console.log(likes_temp);
    localStorage.setItem("likes",JSON.stringify(likes_temp));
    setMovies(likes_temp)
  }

  return(
    <div className={styles.univ}>
      <Titlebar/>
      <Navbar liked={false} home={true}/>
      <div className={styles.main}>
        {
          movies.length>0 && 
          movies.map((m)=>{
            return(
              <MovieCard key={m.imdbID+m.like} data={m} addLike={()=>disLike(m)}/>
            )
          })
        }
        {
          movies.length==0&&<p>No Data Found!</p>
        }
      </div>
    </div>
  )
}

export default LikedMovies;