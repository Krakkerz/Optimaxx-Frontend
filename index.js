import {renderText, setActiveLink, adjustForMissingHash, loadTemplate, renderTemplate} from "/scripts/utils.js"
import "/scripts/navigo.js";

import * as Movies from "/pages/movies.js";
import * as Home from "/pages/home.js";

window.addEventListener("load", async () => {
    const router = new Navigo("/", { hash: true });
    router
        .hooks({
            before(done, match) {
                setActiveLink("nav", match.url)
                done()
            }
        })
        .on("/", () => Home.pageHandler())
        .on("/about", () => renderTemplate(null, 'content'))
        .on("/movies", ({data}) => Movies.pageHandler(data) )
        .on("/movies/:movie_id", ({data}) => Movies.pageHandler(data))
        .notFound(() => renderText("No page for this route found", "content"))
        .resolve()
});

window.onerror = (e) => alert(e)