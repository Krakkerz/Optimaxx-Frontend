import {handleHttpErrors} from "../../utility/error.js";
import {makeOptions} from "../../utility/utils.js";
import {SERVER} from "../../utility/config.js";

const reservationsApi = `${SERVER}/api/reservations`
const showingsApi = `${SERVER}/api/showings`

let showingId;
let room;

async function updateRoom(_showingId) {
    const showingResponse = await fetch(`${showingsApi}/${_showingId}`)
        .then(response => handleHttpErrors(response))

    showingId = showingResponse.id
    room = showingResponse.room
}

function renderSeats() {
    document.querySelector(".theatre").innerHTML = ""

    const rowsInRoom = room.seats.map(seat => seat.row).reduce((acc, val) => Math.max(acc, val), Number.NEGATIVE_INFINITY)
    const seatsInRow = room.seats.map(seat => seat.number).reduce((acc, val) => Math.max(acc, val), Number.NEGATIVE_INFINITY)

    const reserveButton = document.createElement("button")
    reserveButton.classList.add("btn__reserve")
    reserveButton.id = "btn__reserve"
    reserveButton.innerText = "Reserve ticket!"

    const htmlSeatsLeft = document.createElement("div")
    htmlSeatsLeft.classList.add("cinema-seats")
    htmlSeatsLeft.classList.add("left")

    const htmlSeatsRight = document.createElement("div")
    htmlSeatsRight.classList.add("cinema-seats")
    htmlSeatsRight.classList.add("right")

    for (let i = 1; i <= rowsInRoom; i++) {
        const htmlRowLeft = document.createElement("div")
        htmlRowLeft.classList.add("cinema-row")
        htmlRowLeft.classList.add(`row-${i}`)

        const htmlRowRight = document.createElement("div")
        htmlRowRight.classList.add("cinema-row")
        htmlRowRight.classList.add(`row-${i}`)

        for (let j = 1; j <= seatsInRow; j++) {
            const filteredSeats = room.seats.filter(seat => seat["number"] === j && seat["row"] === i)
            const seat = filteredSeats[0] // should check this, tho

            const htmlSeat = createHTMLFromSeat(seat)

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
    document.querySelector(".theatre").appendChild(reserveButton)
}

function createHTMLFromSeat(seat) {
    const htmlSeat = document.createElement("div")

    htmlSeat.classList.add("seat")
    htmlSeat.classList.add(seat.reserved ? "reserved" : "unreserved")

    htmlSeat.id = seat.id
    htmlSeat.textContent = `row:${seat.row} num:${seat.number} id:${seat.id}`

    return htmlSeat
}


export async function reserveSeat(match) {
    const showingId = match?.params?.showing

    await updateRoom(showingId)
    renderSeats()
    attachEventListeners()
}

async function postReservation() {
    const seatIdsToBeReserved = []
    for (const activeSeat of document.querySelectorAll(".seat.active")) {
        seatIdsToBeReserved.push(activeSeat.id)
    }

    const options = makeOptions("POST", {
        accountId: 77,
        seatIds: seatIdsToBeReserved,
        showingId: showingId,
    })

    try {
        fetch(`${reservationsApi}`, options)
            .then(response => handleHttpErrors(response))

        console.log(seatIdsToBeReserved)
        for (const seatId of seatIdsToBeReserved) {
            const seat = document.getElementById(seatId)
            seat.classList.remove("active")
        }

        const numberOfTickets = seatIdsToBeReserved.length
        alert(`Thank you reserving ${numberOfTickets} ${numberOfTickets > 1 ? "tickets" : "ticket"}`)

        await updateRoom(showingId)
        renderSeats()
        attachEventListeners()
    } catch (error) {
        console.error(error)
    }
}

function attachEventListeners() {
    const reserveButton = document.getElementById("btn__reserve")
    reserveButton.addEventListener('click', postReservation)

    const seats = document.querySelectorAll("div > .seat")
    for (const seat of seats) {
        seat.addEventListener('click', () => seat.classList.toggle("active"))
    }
}



