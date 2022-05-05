
// TO BE CHANGED TO BACKEND API.
// THIS IS ONLY FOR MOCKING
import {handleHttpErrors} from "../../Utility/error.js";

const SERVER = 'http://localhost:3000/movies'

export async function fetchMovieData() {

    try {
        const movies = await fetch(SERVER)
            .then(response => handleHttpErrors(response))
            .then(movies => {

                const movieContainer = document.getElementById("movie-container")


                for (let i = 0; i < movies.length; i++){
                    const container = document.createElement("div")
                    const details = document.createElement("details")
                    const summary = document.createElement("summary")
                    summary.innerText = "See more!"

                    let title = document.createElement("p")
                    title.innerText = movies[i].title
                    title.classList.add("title")
                    container.appendChild(title)
                    movieContainer.appendChild(container)

                    let image = document.createElement("img")
                    image.src = movies[i].image
                    container.appendChild(image)
                    movieContainer.appendChild(container)

                    let duration = document.createElement("p")
                    duration.innerText = "Duration: " + movies[i].duration
                    container.appendChild(duration)
                    movieContainer.appendChild(container)

                    let rating = document.createElement("p")
                    rating.innerText = "Rating: " + movies[i].rating
                    container.appendChild(rating)
                    movieContainer.appendChild(container)

                    let description = document.createElement("p")
                    description.innerText = movies[i].description

                    details.appendChild(description)
                    details.appendChild(summary)
                    container.appendChild(details)
                    movieContainer.appendChild(container)

                    let button = document.createElement("button")
                    button.classList.add("btn__buy")
                    button.innerText = "Buy ticket!"
                    button.id = movies[i].id
                    container.appendChild(button)
                    movieContainer.appendChild(container)

                    button.addEventListener('click', () => console.log(movies[i].id))


                }
            })

    } catch (err) {
        console.error(err.message)
    }
}