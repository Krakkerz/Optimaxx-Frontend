import {handleHttpErrors} from "../../Utility/error.js";
import {makeOptions} from "../../Utility/Utils.js";

const SERVER = 'http://localhost:8080/api/reservations'
const SHOWING_SERVER = 'https://optimaxx.azurewebsites.net/api/showings'

export function reserveSeat(match) {
    const seats = document.querySelectorAll("div > .seat")
    const movieId = match?.params.movieId
    const showingId = match?.params.showing
    const ticketAmount = document.getElementById("ticketsAmount")
    const reserveButton = document.getElementById("btn__reserve")
    let seatsToBeReserved = []
    let options = makeOptions("POST", {
        accountId: 1,
        seatsId: seatsToBeReserved,
        showingId: showingId,
    })

    try{
        fetch(`${SHOWING_SERVER}/${showingId}`)
            .then(response => handleHttpErrors(response))
            .then(showing => {
                console.log(showing)

                for (let i = 0; i < seats.length; i++) {
                    seats.item(i).id = i.toString()
                    seats[i].addEventListener('click', function () {
                        if (seats[i].className === "seat") {
                            seats[i].classList.add("active")
                            seatsToBeReserved.push(i)
                        } else
                            seats[i].classList.remove("active")
                    })
                    if (seats[i].className === "seat active") {
                        seatsToBeReserved.push(seats[i].id)

                    }
                }
            })

    }catch (error){
        console.error(error)
    }
    // Below code sets the color of the seats to white when pressed.

    reserveButton.addEventListener('click', () => {
        try {
            fetch(`${SERVER}`, options)
                .then(response => handleHttpErrors(response))
            console.log(seatsToBeReserved)
            for(const seat of seats){
                seat.classList.remove("active")
            }
            alert(`Thank you for reserving ${seatsToBeReserved.length} ticket(s)`)
        } catch (error) {
            console.error(error)
        }
    })
}



