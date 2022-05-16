/*export function getParams(match){
    console.log(JSON.stringify(match));
    const x = match?.params?.x
    console.log(x)
}*/

import {handleHttpErrors} from "../../Utility/error.js";

const SERVER = 'http://localhost:8080/api/movies'


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
        const data = await fetch(`${SERVER}/${movieId}/showings`)
            .then(response => handleHttpErrors(response))

        console.log(data)

        for (const showing of data) {
            let startWeekDay = document.createElement("p")
            let startDate = document.createElement("p")
            let startTime = document.createElement("p")
            let anchor = document.createElement("a")

            anchor.setAttribute("href", "https://www.google.com")

            startWeekDay.innerText = showing.startWeekday
            startDate.innerText = showing.startDate
            startTime.innerText = showing.startTime

            anchor.appendChild(startWeekDay)
            anchor.appendChild(startDate)
            anchor.appendChild(startTime)

            weekdayColumns[ showing.startWeekday ].appendChild(anchor)
        }

    } catch (error){
        console.error(error)
    }

}