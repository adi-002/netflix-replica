import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  //A sniff of code which loads everytime the page reloads.
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]); //in array writing the thing which you are fetching from somewhere is compalsary to write so it gets data everytime.

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {

      autoplay: 1,
    },
  }

  const handleClick = (movie) => {
    // if the video is already playing
    if (trailerUrl) {
      //then clear it basically hide the video.       
      setTrailerUrl("");
    } else {
      //else it goes on youtube and try to find trailer for it
      movieTrailer(movie?.name || "") // "" is included coz sometimes names are also undefined
        .then((url) => {
          //EXAMPLE URL - https://www.youtube.com/watch?v=XthMThy8QKqU    here: XthMThy8QKqU id the specific id we want.

          //it gets the specific id from video url from youtube link.
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        }).catch((error) => console.log(error));
      //if it gives the error then capture the error and show on console.
    }
  };
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {/*sevral row posters */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`} //if it has larger row then run the row_posterLarger CSS.
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path //if it got the larger row then print poster else print the clip.
              }`}
            alt={movie.name}
          />
        ))}
      </div>
      {/* it states that when there is trailer url then only show the youtuble video */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
