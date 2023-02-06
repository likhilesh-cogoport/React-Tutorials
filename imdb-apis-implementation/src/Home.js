import axios from 'axios';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import LikeButton from './components/LikeButton';
import MovieCard from './components/MovieCard/MovieCard';
import styles from './styles.module.css'
import { Link } from 'react-router-dom';
import Titlebar from './components/Titlebar';
import Navbar from './components/Navbar';

function Home(){
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [likes, setLikes] = useState([])
  const [searchId,setSearchId] = useState("");
  const [pagination, setPagination] = useState(false)
  // const [like_flags, setLike_flags] = useState((Array(10)).fill(false))

  useEffect(() => {
    getMovies();
  }, [])
  
  useEffect(() => {
    if(searchText.length==0)getMovies();
  }, [searchText]);

  useEffect(() => {
    if(searchId.length==0)getMovies();
  }, [searchId]);
  
  useEffect(()=>{
    getMovies();
  },[currentPage]);

  useEffect(()=>{
      if(likes.length>0)localStorage.setItem('likes',JSON.stringify(likes));
      computeLike(movies);
  },[likes])
    
  // useEffect(()=>{
  //   // computeLike(movies);
  // },[movies])

  async function searchMoviesByID(){
    let search_query= `http://www.omdbapi.com/?i=${searchId}&apikey=3c2e5580`;
    let data = await axios.get(search_query);
    setTotalPages(1);
    setPagination(false);
    setMovies([data.data]);
  }

  async function callAPI(){
    // let data = await axios.get(
    // );
    let textParam="harry";
    if(searchText.length>2){
      textParam=searchText;
    }
    let _page=currentPage<1?1:currentPage;
    let search_query=`http://www.omdbapi.com/?s='${textParam}'&page=${_page}&y=${searchYear}&apikey=3c2e5580`;
    // if(currentPage==-1){
    //   search_query= `http://www.omdbapi.com/?i=${searchId}&apikey=3c2e5580`
    // }
    let data = await axios.get(search_query);
    console.log(data.data);
    if(data.data.Response=='True'){
        // if(currentPage==-1){
        //   setTotalPages(1);
        //   return [data.data];
        // }
        // else{
          (data.data.Search)=(data.data.Search).map((d)=>{
            d.like=0;
            return d;
          })
          setTotalPages(Math.ceil(data.data.totalResults/10));
          setCurrentPage(_page);
          setPagination(true)
          return data.data.Search;
        // }
      }
      return [];
    }
    
    async function getMovies(){
      callAPI().then(d=>{
        setMovies(d)
        getLikes()
      });
  }

  function searchMovies(type){
    setTotalPages(0);
    setCurrentPage(0);
  }
  

  function getLikes(){
    let likes_data=localStorage.getItem("likes");
    console.log("SOME like data")
    if(likes_data){
      console.log(likes_data)
      setLikes(JSON.parse(likes_data));
    }
    else{
      console.log("NO like data")
    }
    // setLikes(localStorage.getItem("likes")?JSON.parse(localStorage.getItem("likes")):[]);
  }
  
  function previousPage(){
    if(currentPage>1){
      setCurrentPage(currentPage-1);
    }
  }

  function nextPage(){
    if(currentPage<totalPages){
      setCurrentPage(currentPage+1)
    }
  }

  function addLike(val){
    console.log(val);
    if(!val.like){
      console.log('liking');
      setLikes([...likes,val]);
    }
    else{
      let likes_temp=likes.filter((l)=>l.imdbID!=val.imdbID);
      if(likes_temp.length==0){
        localStorage.setItem("likes","[]");
      }
        setLikes(likes_temp);
    }
    // setMovies(movies.map((m)=>{
    //   if(m.imdbID==val.imdbID){
    //     m.imdbID=!m.imdbID;
    //   }
    //   return m;
    // }));
  }
  
  function computeLike(data){
    // console.log(data,likes);
    // if(data)data.forEach((d) => {
    //   if(likes.find(l=>l.imdbID==d.imdbID)){
    //     console.log(1);
    //     d.like=1;
    //   }
    //   else{
    //     console.log(0);
    //     d.like=0;
    //   }
    // });
    // // setMovies(data);
    // console.log(data)
    // setMovies([...data]);
    setMovies(data.map((d)=>{
      if(likes.find(l=>l.imdbID==d.imdbID)){
        console.log(1);
        d.like=1;
      }
      else{
        console.log(0);
        d.like=0;
      }
      return d;
    }))
  }

  return(
    <div className={styles.univ}>
      {/* <div className={styles.navbar}>
        <p className={styles.navbarTitle}> IMDB Movies </p>
      </div> */}
      <Titlebar/>
      <Navbar liked={true} home={false}/>
      <div className={styles.searchBoxContainer}>
        <input type="text" placeholder='Search By Name' value={searchText} onChange={(e)=>{setSearchText(e.target.value)}}/>
        <input type="number" placeholder='Search By Year' value={searchYear} onChange={(e)=>{setSearchYear(e.target.value)}}/>
        <button className={styles.btn} onClick={()=>searchMovies()} disabled={searchText.length<3}>Search</button>
      </div>
      <div className={styles.searchBoxContainer}>
        <input type="text" placeholder='Search By Id' value={searchId} onChange={(e)=>{setSearchId(e.target.value)}}/>
        <button  className={styles.btn} onClick={()=>searchMoviesByID()} disabled={searchId.length<1}>Search</button>
      </div>
      <div className={styles.totalPages}>
        Total Pages : {totalPages}
      </div>
      <div className={styles.main}>
          {
            movies.length>0 && 
            movies.map((m)=>{
              return(
                <MovieCard key={m.imdbID+m.like} data={m} addLike={()=>addLike(m)}/>
              )
            })
          }
          {
            movies.length==0&&<p>No Data Found!</p>
          }
        </div>
        {
          pagination&&
          <div className={styles.paginationBar}>
            <div className={styles.paginationContainer}>
              <button onClick={previousPage} disabled={currentPage<=1}>{"<<"}</button>
              {currentPage}
              <button onClick={nextPage} disabled={currentPage>=totalPages}>{">>"}</button>
            </div>
          </div>
        }

      <div className={styles.navbar}>
        <div>
          <Link to="/liked-movies">Liked&nbsp;Movies</Link>
        </div>
      </div>
    </div>
  )
}

export default Home;