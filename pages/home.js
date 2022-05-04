const template = document.createElement("template")
template.innerHTML = `
    <h2>Home page</h2>
    <p>Welcome to Optimaxx</p>
`

export async function pageHandler() {
    document.querySelector("main").innerHTML = ""
    document.querySelector("main").appendChild(template.content.cloneNode(true))
}
