"use client";
import React from "react";
import Nav from "@/components/Nav";
import Banner from "@/components/Banner";
import MovieRow from "@/components/MovieRow";
import request from "@/api/request";
import Footer from "@/components/Footer";
const HomeScreen = () => {
  return (
    <div className="">

  

      <Nav />
      <Banner />
      <MovieRow title="NETFLIX ORIGINALS" fetchURL={request.fetchNetflixOriginals} isLargeRow/>
      <MovieRow title="Trending Now" fetchURL={request.fetchTrending} isLargeRow={false}/>
      <MovieRow title="Action Movies" fetchURL={request.fetchActionMovies} isLargeRow={false}/>
      <MovieRow title="Animated Series" fetchURL={request.fetchAnimatedMovies} isLargeRow={false}/>
      <MovieRow title="Documentry Movies" fetchURL={request.fetchDocumentry} isLargeRow={false}/>
      <MovieRow title="Top Rated" fetchURL={request.fetchTopRated} isLargeRow={false}/>
      <MovieRow title="Romance Movies" fetchURL={request.fetchRomance} isLargeRow={false}/>
      <MovieRow title="Horror Movies" fetchURL={request.fetchHorrorMovies} isLargeRow={false}/>
      <Footer />
      {
        /*
         */}
    </div>
  );
};

export default HomeScreen;
