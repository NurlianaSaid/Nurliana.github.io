const navSlide = () => {
    const burger = document.querySelector('.burger');
    const navList = document.querySelector('nav');

    burger.addEventListener('click', () => {
        navList.classList.toggle("nav-active");
        burger.classList.toggle("toggle-burger");
    });
};

navSlide(); // Memanggil fungsi navSlide dengan tanda kurung ()


// clear form before unload

window.onbeforeunload = () => {
    // event.preventDefault();
    // event.returnValue = 'Apakah anda ingin meninggalkan tempat ini?';
    for (const form of document.getElementsByTagName("form")) {
        form.reset();
    }
}


//efek ngetik
const txtElement = ['Freelancer', 'Web Developer', 'Graphic Designer'];
let count = 0;
let txtIndex = 0;
let currentTxt = '';
let words = '';
let speed = 100; // Kecepatan animasi (dalam milidetik)

function ngetik() {
    if (count === txtElement.length) {
        count = 0;
    }

    currentTxt = txtElement[count];

    words = currentTxt.slice(0, ++txtIndex);
    document.querySelector('.efek-ngetik').textContent = words;

    if (words.length === currentTxt.length) {
        count++;
        txtIndex = 0;
        setTimeout(ngetik, 1000); // Memberi jeda sebelum menampilkan kata berikutnya
    } else {
        setTimeout(ngetik, speed); // Memanggil fungsi untuk menambah huruf selanjutnya
    }
}

// Memanggil fungsi ngetik untuk pertama kali
ngetik();


//slider
const wrapper = document.querySelector('.wrapper');
const carousel = document.querySelector('.carousel');
const arrowBtns = document.querySelectorAll('.wrapper ion-icon'); 
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false,
    startX,
    startScrollLeft,
    timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    carouselChildrens.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    arrowBtns.forEach(btn => {
       btn.addEventListener("click", () =>{
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
       }) 
    })

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
   
}

const dragging = (e) => {
    if (!isDragging) return;
   carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const autoPlay = () => {
    if(window.innerWidth < 800) return;
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();
//benar muncul right
// const infiniteScroll = () => {
//     if(carousel.scrollLeft === 0){
//         console.log("You've readhed to the left end");
//     }else if(carousel.scrollLeft >= carousel.scrollWidth - carousel.offsetWidth){
//         console.log("You've readhed to the right end");
//     }
// }

//ini juga benar muncul right
const infiniteScroll = () => {
    if(carousel.scrollLeft === 0){
        carousel.classList.add("no-transition");
       carousel.scrollLeft = carousel.scrollWidth - ( 2 * carousel.offsetWidth);
       carousel.classList.remove("no-transition");

    }else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
       carousel.classList.remove("no-transition");

    }
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () =>  clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay());