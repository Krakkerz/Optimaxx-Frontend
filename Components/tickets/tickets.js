/*export function getParams(match){
    console.log(JSON.stringify(match));
    const x = match?.params?.x
    console.log(x)
}*/

import {handleHttpErrors} from "../../Utility/error.js";

const SERVER = 'https://optimaxx.azurewebsites.net/api/movies/'


export async function data(match){
    const movieId = match?.params?.id
    console.log(movieId)
    const weekDays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    const saturday = document.getElementById("saturday")

    try {
        const data = await fetch(SERVER + movieId + "/showings")
            .then(response => handleHttpErrors(response))
            .then(data => {

                for (let i = 0; 0 < data.length; i++){
                    let div = document.createElement("div")
                    let startWeekDay = document.createElement("p")
                    let startDate = document.createElement("p")
                    let startTime = document.createElement("p")
                    let anchor = document.createElement("a")

                    anchor.setAttribute("href","https://www.google.com")

                    startWeekDay.innerText = data[i].startWeekday
                    startDate.innerText = data[i].startDate
                    startTime.innerText = data[i].startTime

                    anchor.appendChild(startDate)
                    anchor.appendChild(startTime)

                    div.appendChild(anchor)
                    saturday.appendChild(div)

                }

            })

    }catch (error){
        console.error(error)
    }

}