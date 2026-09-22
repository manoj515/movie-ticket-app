const movies = [
  {
    id: 1,
    title: "The Last Horizon",
    genre: "Sci-Fi • 2h 15m",
    rating: "8.7",
    poster: ""
  },
  {
    id: 2,
    title: "Ocean Secrets",
    genre: "Adventure • 1h 58m",
    rating: "8.2",
    poster: "poster-2"
  },
  {
    id: 3,
    title: "Midnight Chase",
    genre: "Action • 2h 05m",
    rating: "8.5",
    poster: "poster-3"
  },
  {
    id: 4,
    title: "Green Valley",
    genre: "Drama • 2h 10m",
    rating: "8.1",
    poster: "poster-4"
  }
];

let selectedMovie = null;
let selectedTime = null;
let selectedSeats = [];

const movieList = document.getElementById("movie-list");
const selectedMovieElement = document.getElementById("selected-movie");
const seatMap = document.getElementById("seat-map");
const ticketCount = document.getElementById("ticket-count");
const totalPrice = document.getElementById("total-price");
const bookButton = document.getElementById("book-btn");

const ticketPrice = 250;

function renderMovies() {
  movieList.innerHTML = movies.map(movie => `
    <div class="movie-card">
      <div class="poster ${movie.poster}">
        <h3>${movie.title}</h3>
      </div>

      <div class="movie-info">
        <p>${movie.genre}</p>
        <p>⭐ ${movie.rating}/10</p>

        <button
          class="select-movie"
          onclick="selectMovie(${movie.id})">
          Book Tickets
        </button>
      </div>
    </div>
  `).join("");
}

function selectMovie(movieId) {
  selectedMovie = movies.find(movie => movie.id === movieId);

  selectedMovieElement.textContent = selectedMovie.title;

  selectedSeats = [];
  selectedTime = null;

  document.querySelectorAll(".time-btn")
    .forEach(btn => btn.classList.remove("active"));

  renderSeats();
  updateSummary();

  document.getElementById("booking")
    .scrollIntoView({ behavior: "smooth" });
}

function renderSeats() {
  seatMap.innerHTML = "";

  const occupiedSeats = [
    3, 4, 8, 17, 24, 25, 32, 39,
    42, 48, 55, 67, 73, 78, 89
  ];

  for (let i = 1; i <= 90; i++) {
    const seat = document.createElement("div");

    seat.className = "seat";

    if (occupiedSeats.includes(i)) {
      seat.classList.add("occupied");
    }

    if (selectedSeats.includes(i)) {
      seat.classList.add("selected");
    }

    seat.textContent = "";
    seat.title = `Seat ${i}`;

    if (!occupiedSeats.includes(i)) {
      seat.addEventListener("click", () => toggleSeat(i));
    }

    seatMap.appendChild(seat);
  }
}

function toggleSeat(seatNumber) {
  if (selectedSeats.includes(seatNumber)) {
    selectedSeats = selectedSeats.filter(
      seat => seat !== seatNumber
    );
  } else {
    if (selectedSeats.length >= 8) {
      alert("Maximum 8 seats can be booked.");
      return;
    }

    selectedSeats.push(seatNumber);
  }

  renderSeats();
  updateSummary();
}

function updateSummary() {
  ticketCount.textContent = selectedSeats.length;
  totalPrice.textContent =
    `₹${selectedSeats.length * ticketPrice}`;

  bookButton.disabled =
    !selectedMovie ||
    !selectedTime ||
    selectedSeats.length === 0;
}

document.querySelectorAll(".time-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".time-btn")
      .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");
    selectedTime = button.textContent;

    updateSummary();
  });
});

bookButton.addEventListener("click", () => {
  const date = document.getElementById("show-date").value;

  const bookingId =
    "CB-" +
    Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

  document.getElementById("booking-details").innerHTML = `
    <strong>Booking ID:</strong> ${bookingId}<br>
    <strong>Movie:</strong> ${selectedMovie.title}<br>
    <strong>Date:</strong> ${date}<br>
    <strong>Show:</strong> ${selectedTime}<br>
    <strong>Seats:</strong> ${selectedSeats.join(", ")}<br>
    <strong>Tickets:</strong> ${selectedSeats.length}<br>
    <strong>Total:</strong> ₹${selectedSeats.length * ticketPrice}
  `;

  document.getElementById("booking").classList.add("hidden");
  document.getElementById("confirmation").classList.remove("hidden");

  window.scrollTo({
    top: document.getElementById("confirmation").offsetTop - 50,
    behavior: "smooth"
  });
});

document.getElementById("new-booking")
  .addEventListener("click", () => {
    selectedMovie = null;
    selectedTime = null;
    selectedSeats = [];

    selectedMovieElement.textContent = "Select a movie";

    document.getElementById("confirmation")
      .classList.add("hidden");

    document.getElementById("booking")
      .classList.remove("hidden");

    renderSeats();
    updateSummary();

    document.getElementById("movies")
      .scrollIntoView({ behavior: "smooth" });
  });

renderMovies();
renderSeats();
updateSummary();
