import "https://unpkg.com/navigo"  //Will create the global Navigo object used below

import {
    renderText,
    setActiveLink,
    adjustForMissingHash,
    loadTemplate,
    renderTemplate,
} from "./utils.js"

window.addEventListener("load", async () => {
    const templateAbout = await loadTemplate('./Components/home/home.html')

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
        .notFound(() => renderText("No page for this route found", "content"))
        .resolve()
});


window.onerror = (e) => alert(e)