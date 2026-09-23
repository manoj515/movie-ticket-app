let selectedSeats = [];
let selectedTime = null;

const occupiedSeats = [
    2, 5, 9, 14, 18, 23, 29, 35, 42, 47
];

const seatsContainer = document.getElementById("seats");

function createSeats() {

    seatsContainer.innerHTML = "";

    for (let i = 1; i <= 48; i++) {

        const seat = document.createElement("div");

        seat.classList.add("seat");

        seat.dataset.seat = i;

        if (occupiedSeats.includes(i)) {
            seat.classList.add("occupied");
        }

        seat.addEventListener("click", () => {

            if (seat.classList.contains("occupied")) {
                return;
            }

            toggleSeat(seat, i);

        });

        seatsContainer.appendChild(seat);
    }
}

function toggleSeat(seat, number) {

    if (selectedSeats.includes(number)) {

        selectedSeats =
            selectedSeats.filter(seatNumber => seatNumber !== number);

        seat.classList.remove("selected");

    } else {

        selectedSeats.push(number);

        seat.classList.add("selected");
    }

    updateSummary();
}

function selectTime(button) {

    document
        .querySelectorAll(".showtimes button")
        .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    selectedTime = button.textContent;

    document.getElementById("summaryTime").textContent =
        selectedTime;
}

function updatePrice() {

    const movieSelect =
        document.getElementById("movieSelect");

    const [movie, price] =
        movieSelect.value.split("|");

    document.getElementById("summaryMovie").textContent =
        movie;

    updateSummary();
}

function updateSummary() {

    const movieSelect =
        document.getElementById("movieSelect");

    const [movie, price] =
        movieSelect.value.split("|");

    const ticketPrice = Number(price);

    document.getElementById("summaryMovie").textContent =
        movie;

    document.getElementById("summaryTickets").textContent =
        selectedSeats.length;

    if (selectedSeats.length === 0) {

        document.getElementById("summarySeats").textContent =
            "None";

    } else {

        const sortedSeats =
            [...selectedSeats].sort((a, b) => a - b);

        document.getElementById("summarySeats").textContent =
            sortedSeats
                .map(seat => `S${seat}`)
                .join(", ");
    }

    const total =
        selectedSeats.length * ticketPrice;

    document.getElementById("totalPrice").textContent =
        `₹${total}`;
}

function selectMovie(movie, price) {

    const select =
        document.getElementById("movieSelect");

    for (const option of select.options) {

        const [optionMovie] =
            option.value.split("|");

        if (optionMovie === movie) {

            select.value = option.value;
            break;
        }
    }

    updatePrice();

    document
        .getElementById("booking")
        .scrollIntoView({
            behavior: "smooth"
        });
}

function confirmBooking() {

    const movie =
        document.getElementById("summaryMovie").textContent;

    if (!selectedTime) {

        alert("Please select a showtime.");

        return;
    }

    if (selectedSeats.length === 0) {

        alert("Please select at least one seat.");

        return;
    }

    const seats =
        [...selectedSeats]
            .sort((a, b) => a - b)
            .map(seat => `S${seat}`)
            .join(", ");

    const total =
        document.getElementById("totalPrice").textContent;

    alert(
        `Booking Confirmed!\n\n` +
        `Movie: ${movie}\n` +
        `Showtime: ${selectedTime}\n` +
        `Seats: ${seats}\n` +
        `Total: ${total}`
    );
}

createSeats();
updateSummary();
