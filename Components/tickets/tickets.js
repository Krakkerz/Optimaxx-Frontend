/*export function getParams(match){
    console.log(JSON.stringify(match));
    const x = match?.params?.x
    console.log(x)
}*/

import {handleHttpErrors} from "../../Utility/error.js";
import {SERVER} from "../../utility/config.js";

const moviesApi = `${SERVER}/api/movies`

export async function data(match){
    const movieId = match?.params?.id
    console.log(movieId)
    const weekdayColumns = {
        "MONDAY": document.getElementById("monday"),
        "TUESDAY": document.getElementById("tuesday"),
        "WEDNESDAY": document.getElementById("wednesday"),
        "THURSDAY": document.getElementById("thursday"),
        "FRIDAY": document.getElementById("friday"),
        "SATURDAY": document.getElementById("saturday"),
        "SUNDAY": document.getElementById("sunday"),
    }

    try {
        const data = await fetch(`${moviesApi}/${movieId}/showings`)
            .then(response => handleHttpErrors(response))
        console.log(`${moviesApi}/${movieId}/showings`)
        console.log(data)

        for (const showing of data) {
            let startWeekDay = document.createElement("p")
            let startDate = document.createElement("p")
            let startTime = document.createElement("p")
            let basePrice = document.createElement("p")
            let anchor = document.createElement("a")
            let showingId = showing.id

            anchor.setAttribute("data-navigo", "")
            anchor.setAttribute("href", `#/seats?movieId=${movieId}&showing=${showingId}`)

            startDate.innerText = `Date: ${showing.startWeekday} ${showing.startDate}`
            startTime.innerText = `Start time: ${showing.startTime}`
            basePrice.innerText = `Price: ${showing.basePrice}`

            anchor.appendChild(startWeekDay)
            anchor.appendChild(startDate)
            anchor.appendChild(startTime)
            anchor.appendChild(basePrice)

            weekdayColumns[ showing.startWeekday ].appendChild(anchor)
        }

    } catch (error){
        console.error(error)
    }

}