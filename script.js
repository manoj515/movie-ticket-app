let selectedMovie = "";
let ticketPrice = 0;

function selectMovie(movie, price) {
    selectedMovie = movie;
    ticketPrice = price;

    document.getElementById("movie").value = movie;

    calculateTotal();

    document.querySelector(".booking").scrollIntoView({
        behavior: "smooth"
    });
}

function calculateTotal() {
    const tickets =
        parseInt(document.getElementById("tickets").value) || 0;

    const total = tickets * ticketPrice;

    document.getElementById("total").innerText = total;
}

function confirmBooking() {
    const tickets =
        parseInt(document.getElementById("tickets").value) || 0;

    const show =
        document.getElementById("show").value;

    if (!selectedMovie) {
        alert("Please select a movie first.");
        return;
    }

    document.getElementById("message").innerText =
        `Booking confirmed! ${tickets} ticket(s) for ${selectedMovie} at ${show}.`;
}
