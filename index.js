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




const usuarios = document.getElementById('usuarios').getContext('2d');
const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];
const data = {
  labels: labels,
  datasets: [{
    label: 'Pasajeros por vuelo',
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    borderWidth: 1,
    barThickness: 30
  },
  {
    label: 'Proyectados',
    data: [70, 65, 85, 90, 60, 60, 45], // Reemplaza estos valores con tus datos proyectados
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgb(54, 162, 235)',
    borderWidth: 1,
    barThickness: 30
  }]
};

const config = {
  type: 'bar',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    elements: {
      bar: {
        borderWidth: 1,
        barThickness: 1, // Ajusta este valor según tus necesidades
      }
    }
  },
};
new Chart(usuarios,config);


 