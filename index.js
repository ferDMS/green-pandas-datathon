"use strict";

// links
const sideLInksEl = document.querySelectorAll(
  ".sidebar .side-menu li a:not(.logout)",
);

sideLInksEl.forEach((links) => {
  const li = links.parentElement;
  links.addEventListener("click", () => {
    sideLInksEl.forEach((i) => {
      i.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});

// sidebar
const menuBar = document.querySelector(".content nav .bx.bx-menu");
const sideBarEl = document.querySelector(".sidebar");

// menus
menuBar.addEventListener("click", () => {
  sideBarEl.classList.toggle("close");
});

const searchbtn = document.querySelector(
  ".content nav form .form-input button",
);
const searchIcon = document.querySelector(
  ".content nav form .form-input button .bx",
);
const searchForm = document.querySelector(".content nav form");

searchbtn.addEventListener("click", function (e) {
  if (window.innerWidth < 576) {
    e.preventDefault;
    searchForm.classList.toggle("show");

    if (searchForm.classList.contains("show")) {
      searchIcon.classList.replace("bx-search", "bx-x");
    } else {
      searchIcon.classList.replace("bx-x", "bx-search");
    }
  }
});


// resize
window.addEventListener("resize", () => {
  if (window.innerWidth < 768) {
    sideBarEl.classList.add("close");
  } else {
    sideBarEl.classList.remove("close");
  }
});

// dark and light mode
const darkEl = document.querySelector(".dark-mode-link");
const darkIcon = document.querySelector(".dark-mode-link .bx");
const logoImage = document.getElementById("logo-image");

// Set initial icon and logo image for light mode
darkIcon.classList.replace("bx-moon", "bx-sun");
logoImage.src = "./public/viva-aerobus.png"; // Cambia la imagen a la versión para modo claro

darkEl.addEventListener("click", (e) => {
  e.preventDefault(); // Evita que el enlace realice su acción predeterminada
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    darkIcon.classList.replace("bx-sun", "bx-moon");
    logoImage.src = "./public/viva-aerobus.png"; // Cambia la imagen a la versión para modo oscuro
  } else {
    darkIcon.classList.replace("bx-moon", "bx-sun");
    logoImage.src = "./public/viva-aerobus.png"; // Cambia la imagen a la versión para modo claro
  }
});




const ctx = document.getElementById('chart').getContext('2d');
let chart;

document.getElementById('route-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const routeId = document.getElementById('route-id').value;

    fetch(`http://127.0.0.1:3000/get_data?route_id=${routeId}`)
    .then(response => response.json())
    .then(data => {
        const labels = data.map(row => row.Flight_Number);
        const passengers = data.map(row => row.Passengers);
        const passengersPrediction = data.map(row => row.Passengers_Prediction);

            if (chart) {
                chart.destroy();
            }

            chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Passengers',
                        data: passengers,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }, {
                        label: 'Passengers Prediction',
                        data: passengersPrediction,
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });
});