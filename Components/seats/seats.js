import {handleHttpErrors} from "../../Utility/error.js";
import {makeOptions} from "../../utility/utils.js";

const SERVER = 'http://localhost:8080/api/reservations'
const SHOWING_SERVER = 'http://localhost:8080/api/showings'

let room;

async function updateRoom(showingId) {
    const showingResponse = await fetch(`${SHOWING_SERVER}/${showingId}`)
        .then(response => handleHttpErrors(response))

    room = showingResponse.room;
}

function renderSeats() {
    const rowsInRoom = room.seats.map(seat => seat.row).reduce((acc, val) => Math.max(acc, val), Number.NEGATIVE_INFINITY)
    const seatsInRow = room.seats.map(seat => seat.number).reduce((acc, val) => Math.max(acc, val), Number.NEGATIVE_INFINITY)

    const htmlSeatsLeft = document.createElement("div")
    htmlSeatsLeft.classList.add("cinema-seats")
    htmlSeatsLeft.classList.add("left")

    const htmlSeatsRight = document.createElement("div")
    htmlSeatsRight.classList.add("cinema-seats")
    htmlSeatsRight.classList.add("right")

    for (let i = 1; i <= rowsInRoom; i++) {
        const htmlRowLeft = document.createElement("div", [])
        htmlRowLeft.classList.add("cinema-row")
        htmlRowLeft.classList.add(`row-${i}`)

        const htmlRowRight = document.createElement("div", [])
        htmlRowRight.classList.add("cinema-row")
        htmlRowRight.classList.add(`row-${i}`)

        for (let j = 1; j <= seatsInRow; j++) {
            const filteredSeats = room.seats.filter(seat => seat["number"] === j && seat["row"] === i)
            const seat = filteredSeats[0] // should check this, tho

            const htmlSeat = document.createElement("div")
            htmlSeat.classList.add("seat")
            htmlSeat.classList.add(seat.reserved ? "reserved" : "unreserved")

            htmlSeat.id = seat["id"]
            htmlSeat.textContent = `row:${seat["row"]} num:${seat["number"]} id:${seat["id"]}`

            if (j % 2 === 0) {
                htmlRowLeft.appendChild(htmlSeat)
            } else {
                htmlRowRight.appendChild(htmlSeat)
            }
        }

        htmlSeatsLeft.appendChild(htmlRowLeft)
        htmlSeatsRight.appendChild(htmlRowRight)
    }

    document.querySelector(".theatre").appendChild(htmlSeatsLeft)
    document.querySelector(".theatre").appendChild(htmlSeatsRight)
}


export async function reserveSeat(match) {
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

    await updateRoom(showingId)
    renderSeats()

    // .then(showing => {
    //     console.log(showing)
    //
    //     for (let i = 0; i < seats.length; i++) {
    //         seats.item(i).id = i.toString()
    //         seats[i].addEventListener('click', function () {
    //             if (seats[i].className === "seat") {
    //                 seats[i].classList.add("active")
    //                 seatsToBeReserved.push(i)
    //             } else
    //                 seats[i].classList.remove("active")
    //         })
    //         if (seats[i].className === "seat active") {
    //             seatsToBeReserved.push(seats[i].id)
    //
    //         }
    //     }
    // })

    // }catch (error){
    //     console.error(error)
    // }
    // Below code sets the color of the seats to white when pressed.

    // reserveButton.addEventListener('click', () => {
    //     try {
    //         fetch(`${SERVER}`, options)
    //             .then(response => handleHttpErrors(response))
    //         console.log(seatsToBeReserved)
    //         for(const seat of seats){
    //             seat.classList.remove("active")
    //         }
    //         alert(`Thank you for reserving ${seatsToBeReserved.length} ticket(s)`)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // })
}



