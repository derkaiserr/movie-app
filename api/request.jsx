// const API_KEY = 'b2a94a788bb4a0469f5295f047a3fa3b'
import API_KEY from "../config";
const request = {
    // fetchAll:`/discover/movie?api_key=${API_KEY}&language=en-US`,
    fetchTrending:  `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchTopRated:  `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals:  `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchActionMovies:  `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchAnimatedMovies:  `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies:  `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomance:  `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentry:  `/discover/movie?api_key=${API_KEY}&with_genres=99`
}

export default request;