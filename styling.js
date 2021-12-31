//random SVG 
const randomNum = Math.floor(Math.random() * 5) 
document.getElementById("svg").src = `images/movie${randomNum}.svg`


window.addEventListener("scroll", function () {
    let navContainer = document.querySelector(".nav-container");
    navContainer.classList.toggle("scrolling-active", window.scrollY > 1);
});


const menuBtn = document.querySelector(".btn");

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open");
})
