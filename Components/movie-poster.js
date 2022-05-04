const template = document.createElement("template")
template.innerHTML = `
    <div class="movie-poster">
        <img class="poster" id="image" src="" alt="">
        <div class="info">
            <span id="title"></span> (<span id="year"></span>)
            <span id="duration"></span> <span id="rating"></span>
        </div>
    </div>
`

export class MoviePoster {
    constructor({title, duration, rating, year, image} = {}) {
        this._title = title
        this._duration = duration
        this._rating = rating
        this._year = year
        this._image = image
    }

    get title() { return this._title; }
    set title(value) { this._title = value; }

    get duration() { return this._duration; }
    set duration(value) { this._duration = value; }

    get rating() { return this._rating; }
    set rating(value) { this._rating = value; }

    get year() { return this._year; }
    set year(value) { this._year = value; }

    get image() { return this._image; }
    set image(value) { this._image = value; }

    renderHTML() {
        const movie_poster = template.content.cloneNode(true)
        movie_poster.querySelector("#title").textContent = this._title
        movie_poster.querySelector("#duration").textContent = this._duration
        movie_poster.querySelector("#rating").textContent = this._rating
        movie_poster.querySelector("#year").textContent = this._year
        movie_poster.querySelector("#image").src = this._image
        movie_poster.querySelector("#image").alt = `Movie poster for ${this._title} (${this._year})`

        return movie_poster
    }
}