import React from "react";
import "./App.css";
import request from "./request";
import Row from "./Row";
import Nav from "./Nav";
import Banner from "./Banner";
function App() {
  return (
    <div className="App">
      <Nav />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={request.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={request.fetchTrending} />
      <Row title="Top Rated" fetchUrl={request.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={request.fetchActionMovie} />
      <Row title="Comedy Movies" fetchUrl={request.fetchComedyMovie} />
      <Row title="Horror Movies" fetchUrl={request.fetchHorrorMovie} />
      <Row title="Romance Movies" fetchUrl={request.fetchRomanticMovie} />
      <Row title="Documentaries" fetchUrl={request.fetchDocumentries} />
    </div>
  );
}

export default App;
