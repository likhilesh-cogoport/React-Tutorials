import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Titlebar from './components/Titlebar';
import Navbar from './components/Navbar';
import styles from './MovieStyles.module.css';
import LikeButton from './components/LikeButton';

export default function Movie() {
    const param = useParams();
    const [movieData, setMovieData] = useState({})
    const [likes, setLikes] = useState([])

    useEffect(() => {
      axios.get(`http://www.omdbapi.com/?i=${param.id}&apikey=3c2e5580`).then((d)=>{
        // console.log(d.data);
        d.data.like=false;
        setMovieData(d.data);
        getLikes();
      })
    }, [])

    useEffect(() => {
        // console.log(movieData,likes);
        if(movieData&&likes.length>0&&likes.find(l=>l.imdbID==movieData.imdbID)){
            setMovieData({ ...movieData, "like":true })
        }
        else{
            setMovieData({ ...movieData, "like":false })
        }
        // console.log(likes)
    }, [likes])

    // useEffect(()=>{
    //     console.log(movieData)
    // },[movieData])
    
    function addLike(){
        if(!movieData.like){
            setLikes([...likes,movieData]);
            localStorage.setItem("likes",JSON.stringify([...likes,movieData]));
        }
        else{
            let likes_temp=likes.filter((l)=>l.imdbID!=movieData.imdbID);
            setLikes(likes_temp);
            localStorage.setItem("likes",JSON.stringify(likes_temp))
        }
    }

    function getLikes(){
        let like_temp = localStorage.getItem("likes");
        if(like_temp){
            like_temp=JSON.parse(like_temp);
            setLikes(like_temp);
        }
    }

    
  return (
    <div className={styles.univ}>
        <Titlebar/>
        <Navbar liked={true} home={true} />
        {
            movieData!=undefined?
            <>
                <div className={styles.main}>
                    <div className={styles.part1}>
                        <img src={`${movieData.Poster}`} width="300px"/>
                        <div className={styles.btnContainer}>
                            <LikeButton flag={movieData.like} addLike={addLike}/>
                        </div>
                    </div>
                    <div className={styles.part2}>
                        <div className={styles.title1}>
                            {`${movieData.Title}`}&nbsp;
                            <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                                <sup style={{fontSize:'10px'}}>{`${movieData.Type?.toUpperCase()}`}</sup>
                                <sub style={{fontSize:'10px'}}>{movieData.Year}</sub>
                            </div>
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
                                movieData.Ratings?.map((d,i)=>{
                                    return(
                                        <li key={i}>{d.Source} : {d.Value}</li>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.genC1}>
                            Actors: {movieData.Actors}
                        </div>
                        <div className={styles.genC1}>
                            Awards: {movieData.Awards}
                        </div>
                        
                    </div>
                </div>
            </>
            :'Loading ...'
        }
    </div>
  )
}
