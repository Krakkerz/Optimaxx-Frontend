import {MoviePoster} from "/components/movie-poster.js";

const template = document.createElement("template")
template.innerHTML = `
    <h2>All the movies</h2>
    <div class="movie-posters" id="movie-posters"></div>
`

export async function pageHandler() {
    document.querySelector("main").innerHTML = ""
    document.querySelector("main").appendChild(template.content.cloneNode(true))

    const movie_data = [
        {title: "Avengers 1", duration: "210m", rating: "4 stars", year: "2012", image: "https://www.themoviedb.org/t/p/w1280/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg" },
        {title: "Avengers 2", duration: "220m", rating: "3 stars", year: "2013", image: "https://www.themoviedb.org/t/p/w1280/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg"},
        {title: "Avengers 3", duration: "230m", rating: "2 stars", year: "2014", image: "https://www.themoviedb.org/t/p/w1280/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg"},
        {title: "Avengers 4", duration: "240m", rating: "1 stars", year: "2015", image: "https://www.themoviedb.org/t/p/w1280/or06FN3Dka5tukK1e9sl16pB3iy.jpg"},
    ]

    const movie_posters = []

    for (const movie_datum of movie_data) {
        movie_posters.push( new MoviePoster(movie_datum).renderHTML() )
    }

    for (const movie_poster of movie_posters) {
        document.querySelector("#movie-posters").appendChild(movie_poster);
    }
}