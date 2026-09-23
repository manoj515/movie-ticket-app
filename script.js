const seatContainer = document.getElementById("seats");

let selectedSeats = [];
const ticketPrice = 200;

for (let i = 1; i <= 40; i++) {

    const seat = document.createElement("div");

    seat.className = "seat";
    seat.textContent = i;

    // Some seats are already booked
    if ([5, 12, 19, 27, 35].includes(i)) {
        seat.classList.add("booked");
    }

    seat.addEventListener("click", function () {

        if (seat.classList.contains("booked")) {
            return;
        }

        seat.classList.toggle("selected");

        if (seat.classList.contains("selected")) {
            selectedSeats.push(i);
        } else {
            selectedSeats = selectedSeats.filter(
                number => number !== i
            );
        }

        updateSummary();
    });

    seatContainer.appendChild(seat);
}

function updateSummary() {

    document.getElementById("selectedSeats").textContent =
        selectedSeats.length
            ? selectedSeats.join(", ")
            : "None";

    document.getElementById("total").textContent =
        selectedSeats.length * ticketPrice;
}

function selectMovie(movie) {

    document.getElementById("movie").value = movie;

    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });
}

function confirmBooking() {

    const movie = document.getElementById("movie").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    if (!date) {
        alert("Please select a date.");
        return;
    }

    if (selectedSeats.length === 0) {
        alert("Please select at least one seat.");
        return;
    }

    alert(
        "Booking Confirmed!\n\n" +
        "Movie: " + movie + "\n" +
        "Date: " + date + "\n" +
        "Time: " + time + "\n" +
        "Seats: " + selectedSeats.join(", ") + "\n" +
        "Total: ₹" + (selectedSeats.length * ticketPrice)
    );
}
