import {handleHttpErrors} from "../../Utility/error.js";
import {makeOptions} from "../../Utility/Utils.js";

const SERVER = 'http://localhost:8080/api/reservations/'


export function reserveSeat(match){
    const seats = document.querySelectorAll("div > .seat")
    const movieId = match?.params.movieId
    const showingId = match?.params.showing
    const ticketAmount = document.getElementById("ticketsAmount")
    try {
        fetch(`${SERVER}`)
            .then(response => handleHttpErrors(response))
            .then(seatsRes => {

                for (let i = 0; i < seats.length; i++){
                    seats.item(i).id = i
                    seats[i].addEventListener('click',function(){
                        if (seats[i].className === "seat"){
                            seats[i].classList.add("active")
                        } else
                            seats[i].classList.remove("active")
                    })
                    if (seats[i].className === "seat active"){
                    }
                }
                makeOptions("POST",function(){

                    }
                )
            })


    }
    catch (error){
        console.error(error)
    }



}
