/*export function getParams(match){
    console.log(JSON.stringify(match));
    const x = match?.params?.x
    console.log(x)
}*/

import {handleHttpErrors} from "../../Utility/error.js";

const SERVER = 'http://localhost:3000/showings'


export async function data(match){
    const movieId = match?.params?.id
    console.log(movieId)
    const weekDays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    const saturday = document.getElementById("saturday")
    const monday = document.getElementById("monday")

    try {
        const data = await fetch(SERVER)
            .then(response => handleHttpErrors(response))
            .then(data => {
                console.log(data)

                for (let i = 0; 0 < data.length; i++){
                    if (data[i].startWeekday === "SATURDAY") {
                        let startWeekDay = document.createElement("p")
                        let startDate = document.createElement("p")
                        let startTime = document.createElement("p")
                        let anchor = document.createElement("a")

                        anchor.setAttribute("href", "https://www.google.com")

                        startWeekDay.innerText = data[i].startWeekday
                        startDate.innerText = data[i].startDate
                        startTime.innerText = data[i].startTime

                        anchor.append(startWeekDay, startDate, startTime)

                        saturday.appendChild(anchor)
                    }
                    if (data[i].startWeekday === "MONDAY"){
                        let startWeekDay = document.createElement("p")
                        let startDate = document.createElement("p")
                        let startTime = document.createElement("p")
                        let anchor = document.createElement("a")

                        anchor.setAttribute("href", "https://www.google.com")

                        startWeekDay.innerText = data[i].startWeekday
                        startDate.innerText = data[i].startDate
                        startTime.innerText = data[i].startTime

                        anchor.append(startWeekDay, startDate, startTime)

                        monday.appendChild(anchor)

                    }

                }

            })

    }catch (error){
        console.error(error)
    }

}