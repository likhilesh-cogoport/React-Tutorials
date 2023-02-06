import axios from 'axios';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import LikeButton from './components/LikeButton';
import MovieCard from './components/MovieCard/MovieCard';
import styles from './styles.module.css'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Movie from './Movie';
import LikedMovies from './LikedMovies';
function App(){
  return (
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />}/>
      <Route path="/liked-movies" element={<LikedMovies/>}/>
      <Route path="movie/:id" element={<Movie />}/>
      {/* <Route path = "*" element={<Movie />} /> */}
    </Routes>
  </BrowserRouter>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById("root")
);
