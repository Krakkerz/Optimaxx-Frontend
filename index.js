import "/utility/navigo@8.11.1/lib/navigo.min.js"

import {
    renderText,
    setActiveLink,
    loadTemplate,
    renderTemplate,
} from "../utility/utils.js"
import {fetchMovieData} from "/components/movies/movies.js";
import {data} from "/components/tickets/tickets.js";
import {reserveSeat} from "/components/seats/seats.js";

window.addEventListener("load", async () => {
    const templateAbout = await loadTemplate('/components/home/home.html')
    const templateMovies = await loadTemplate('/components/movies/movies.html')
    const templateTickets = await loadTemplate('/components/tickets/tickets.html')
    const templateSeats = await loadTemplate('/components/seats/seats.html')

    const router = new Navigo("/", { hash: true });
    router
        .hooks({
            before(done, match) {
                setActiveLink("menu", match.url)
                done()
            }
        })
        .on("/", () => renderText("Home", "content"))
        .on("/home", () => renderTemplate(templateAbout, 'content'))
        .on("/movies", () => {
            renderTemplate(templateMovies, 'content')
            fetchMovieData()
        })
        .on("/tickets", (match) => {
            renderTemplate(templateTickets,'content')
            data(match)
            router.updatePageLinks()
        })
        .on("/seats", (match) => {
            renderTemplate(templateSeats, 'content')
            reserveSeat(match)
        })
        .notFound(() => renderText("No page for this route found", "content"))
        .resolve()
});
