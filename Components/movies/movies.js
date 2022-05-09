
// TO BE CHANGED TO BACKEND API.
// THIS IS ONLY FOR MOCKING
import {handleHttpErrors} from "../../Utility/error.js";
import {loadTemplate} from "../../Utility/Utils.js";

const SERVER = 'https://optimaxx.azurewebsites.net/api/movies'
const ticket = "./Components/tickets/tickets.html"
export async function fetchMovieData() {

    try {
        const movies = await fetch(SERVER)
            .then(response => handleHttpErrors(response))
            .then(movies => {

                const movieContainer = document.getElementById("movie-container")


                for (let i = 0; i < movies.length; i++){
                    // section const
                    const container = document.createElement("div")
                    const details = document.createElement("details")
                    const summary = document.createElement("summary")
                    const trailerLink = document.createElement("a")

                    summary.innerText = "See more!"

                    let title = document.createElement("p")
                    title.innerText = movies[i].title
                    title.classList.add("title")
                    container.appendChild(title)
                    movieContainer.appendChild(container)

                    let image = document.createElement("img")
                    image.src = movies[i].picture
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

                    let genre = document.createElement("p")
                    genre.innerText = "Genre: " + movies[i].category
                    genre.classList.add("genre")
                    container.appendChild(genre)
                    movieContainer.appendChild(container)

                    let plot = document.createElement("p")
                    plot.innerText = movies[i].plot

                    trailerLink.innerText = "Watch trailer"
                    trailerLink.setAttribute("href",movies[i].trailer)
                    trailerLink.setAttribute("target","_blank")

                    details.appendChild(plot)
                    details.appendChild(summary)
                    details.appendChild(trailerLink)
                    container.appendChild(details)
                    movieContainer.appendChild(container)

                    let ticketTemplate = document.createElement("a")
                    ticketTemplate.classList.add("btn__buy")
                    ticketTemplate.setAttribute("href","https://www.facebook.com/")
                    ticketTemplate.setAttribute("data-navigo","")
                    ticketTemplate.innerText ="Reserve ticket!"
                    container.appendChild(ticketTemplate)
                    movieContainer.appendChild(container)

                  /*  let button = document.createElement("a")
                    button.classList.add("btn__buy")
                    button.innerText = "Reserve  ticket!"
                    button.id = movies[i].id
                    ticketTemplate.setAttribute("href",'https://www.google.dk/')
                    ticketTemplate.setAttribute("data-navigo","")
                    button.appendChild(ticketTemplate)
                    container.appendChild(button)
                    movieContainer.appendChild(container)*/


                    //button.addEventListener('click', () => console.log(movies[i].id))


                }
            })

    } catch (err) {
        console.error(err.message)
    }
}