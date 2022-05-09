import "https://unpkg.com/navigo"  //Will create the global Navigo object used below

import {
    renderText,
    setActiveLink,
    loadTemplate,
    renderTemplate,
} from "../Utility/Utils.js"
import {fetchMovieData} from "../Components/movies/movies.js";
import {getParams} from "../Components/tickets/tickets.js";

window.addEventListener("load", async () => {
    const templateAbout = await loadTemplate('./Components/home/home.html')
    const templateMovies = await loadTemplate('./Components/movies/movies.html')
    const templateTickets = await loadTemplate('./Components/tickets/tickets.html')

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
            getParams(match)
            router.updatePageLinks()
        })
        .notFound(() => renderText("No page for this route found", "content"))
        .resolve()
});
