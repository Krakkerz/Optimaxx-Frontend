
// TO BE CHANGED TO BACKEND API.
// THIS IS ONLY FOR MOCKING
import {handleHttpErrors} from "../../Utility/error.js";
import {encode} from "../../Utility/Utils.js";

const SERVER = 'http://localhost:3000/movies'

export async function fetchMovieData() {

    try {
        const movies = await fetch(SERVER)
            .then(response => handleHttpErrors(response))
            .then(movies => {

                const movieContainer = document.getElementById("movie-container")


                for (let i = 0; i < movies.length; i++){
                    let title = document.createElement("p")
                    title.innerText = movies[i].title
                    movieContainer.appendChild(title)

                    let image = document.createElement("img")
                    image.src = movies[i].image
                    movieContainer.appendChild(image)

                    let duration = document.createElement("p")
                    duration.innerText = movies[i].duration
                    movieContainer.appendChild(duration)

                    let rating = document.createElement("p")
                    rating.innerText = movies[i].rating
                    movieContainer.appendChild(rating)

                    let button = document.createElement("button")
                    button.classList.add("btn__buy")
                    button.innerText = "Buy ticket!"
                    movieContainer.appendChild(button)

                }
            })

    } catch (err) {
        console.error(err.message)
    }
}