




// scroll up button
let mybutton = document.getElementById("scrlUp");
window.onscroll = function () {
    scrollFunction();
};
function scrollFunction() {
    if (document.body.scrollTop > 360 || document.documentElement.scrollTop > 360) {
        mybutton.style.display = "block";
        setTimeout(() => {
            mybutton.classList.add("visible");
        }, 10);
    } else {
        mybutton.classList.remove("visible");
    }
}
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}