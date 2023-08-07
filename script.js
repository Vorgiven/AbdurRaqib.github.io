// script.js

// Store all selectors,ids and classes
const btnBack = document.querySelector("#btnBack");
const btnHamburger = document.querySelector("#btnHamburger");
const navSub = document.querySelector("#navbar"); // the navigation in menubar
const navMain = document.querySelector("#navMain"); // the main nav of page
const navMainBtn = document.querySelectorAll("#navMain .nav-card button"); // list of buttons in nav main
const navCard = document.querySelectorAll("#navMain .nav-card"); // list of nav cards in nav main
const mainContents = document.querySelectorAll("main .content"); // list of content page
const navSideMenu = document.getElementById("nav-side-menu"); // nav side menu
const navSection = document.getElementById("nav-section-list"); // nav bottom
const btnCloseMenu = document.getElementById("close-menu"); // close menu
const h1SectionTitle = document.querySelector("#section-title h1"); // section title
const h1AllSectionTitle = document.querySelectorAll("main .content h1"); // section title all
const sections = document.querySelectorAll("main .content section"); // list sections
const sectionsEven = document.querySelectorAll("main>.content > :nth-child(even)"); // list sections even
const sectionsOdd = document.querySelectorAll("main>.content > :nth-child(odd)"); // list sections odd

console.log();
// page variables
var isMobile = IsMobileSize();
var currentPage = 0;
var athome = true;

// Start functions
function Start() {
    // Check if on mobile
    btnBack.style.display = "none";
    btnHamburger.style.display = "none";
    HideAllPages(); // hide all page
    SetupSectionID();
    RemoveNavSection();
    ResizeGamePanel();
}

// Check if on mobile
function IsMobileSize() {
    let mobileWidth = 800;
    let width = window.innerWidth;
    if (width <= mobileWidth)
        return true;
    return false;
}

// Slide in effect
function slideInOnScroll() {
    for (let i = 0; i < sections.length; i++) {
        const sectionTop = sections[i].offsetTop;
        const sectionBottom = sectionTop + sections[i].clientHeight;
        const isSectionVisible = window.scrollY >= sectionTop && window.scrollY <= sectionBottom;
        if (isSectionVisible) {
            sections[i].style.marginLeft = '10%';
        }
    }
}

window.addEventListener('scroll', slideInOnScroll);

// Set up id for sections - use for link jump to section
function SetupSectionID() {
    for (let i = 0; i < mainContents.length; i++) {
        // Get all sections in each content pages
        const sections = mainContents[i].querySelectorAll("section");
        for (let j = 0; j < sections.length; j++) {
            // Set up the id of all sections, this is for jumping to pages with the nav bottom links
            if (!sections[j].getAttribute("id"))
                sections[j].setAttribute("id", "content-" + (i + 1) + "-section-" + (j + 1));
        }
    }
}
// Get the list of title of content
function GetListOfSectionTitle(pageNumber) {
    var listSectionTitle = mainContents[pageNumber - 1].querySelectorAll("section h2");
    return listSectionTitle;
}
// Remove bottom navigation
function RemoveNavSection() {
    if (isMobile)
        navSideMenu.innerHTML = "";
    else
        navSection.innerHTML = "";
}
// Create bottom navigation based on content page
function CreateNavElement(listNames) {
    RemoveNavSection();
    let i = 0;
    listNames.forEach(name => {
        i++;
        const id = "#content-" + currentPage + "-section-" + i; // get the id of each section
        const newLi = document.createElement("li");
        const newA = document.createElement("a");
        newA.setAttribute("href", id); // link the a attribute to part of the page
        newA.textContent = name.textContent;

        newLi.appendChild(newA);
        // Chceck for mobile
        if (isMobile) {
            newA.addEventListener("click", () => {
                ToggleSideNavMenu(false);
            });
            navSideMenu.appendChild(newLi);
        }
        else
            navSection.appendChild(newLi);
    });
}

// Toggle side menu
function ToggleSideNavMenu(toggle) {
    if (toggle == true)
        navSub.style.right = 0 + "%";
    else
        navSub.style.right = -50 + "%";

}


// Back button listerner, will go back to home page *FOR MOVILE USE*
btnBack.addEventListener("click", () => {
    navMain.style.display = "grid"; // enable main navigation
    h1SectionTitle.innerHTML = "";
    ToggleSideNavMenu(false);
    btnBack.style.display = "none";
    btnHamburger.style.display = "none";
    HideAllPages();
    athome = true;
});

// Hamburger menu *FOR MOVILE USE*
btnHamburger.addEventListener("click", () => {
    ToggleSideNavMenu(true);
});

// Close menu *FOR MOVILE USE*
btnCloseMenu.addEventListener("click", () => {
    ToggleSideNavMenu(false);
});


// When click button go to next page
navMainBtn[0].addEventListener("click", () => { ChangePage(1); });
navMainBtn[1].addEventListener("click", () => { ChangePage(2); });
navMainBtn[2].addEventListener("click", () => { ChangePage(3); });
navMainBtn[3].addEventListener("click", () => { ChangePage(4); });
navMainBtn[4].addEventListener("click", () => { ChangePage(5); });

// function to go to page
function ChangePage(pageNumber) {
    athome = false;
    currentPage = pageNumber;
    HideAllPages();
    h1SectionTitle.innerHTML = h1AllSectionTitle[pageNumber - 1].innerHTML;
    // show selected content
    mainContents[pageNumber - 1].style.display = "block";


    navCard.forEach(card => {
        card.querySelector("button").style.display = "block";
    });


    navCard[pageNumber - 1].style.backgroundColor = "#F89D13";
    navCard[pageNumber - 1].querySelector("button").style.backgroundColor = "#F89D13";
    navCard[pageNumber - 1].querySelector("button").style.display = "none";
    navCard[pageNumber - 1].querySelector("p").style.color = "#1B120F";
    navCard[pageNumber - 1].querySelector("p").style.fontWeight = "bold";
    navCard[pageNumber - 1].querySelector("h1").style.color = "#1B120F";
    // disable navmain if on mobile
    if (isMobile) {
        navMain.style.display = "none"; // disable main navigation
        btnHamburger.style.display = "block"; // enable hamburger menu
        btnBack.style.display = "block";
        navSub.style.display.right = 0 + "%";

        // Create page bottom navigation for MOBILE
        CreateNavElement(GetListOfSectionTitle(pageNumber));
    }
    else // For desktop
    {
        navSection.style.display = "flex";
        // Create page bottom navigation for DESKTOP
        CreateNavElement(GetListOfSectionTitle(pageNumber));
    }

}
// Hide all content page
function HideAllPages() {
    //Hide all pages
    mainContents.forEach(page => {
        page.style.display = "none";
    });
    navCard.forEach(card => {
        card.style.backgroundColor = "#8F1D14";
        card.querySelector("button").style.backgroundColor = "#8F1D14";
        card.querySelector("p").style.color = "#E6DEDD";
        card.querySelector("p").style.fontWeight = "none";
        card.querySelector("h1").style.color = "#F89D13";
    });

    // Reset slide in

    // Sections odd
    for (let i = 0; i < sectionsOdd.length; i++) {
        sectionsOdd[i].style.marginLeft = "100%";
    }
    // Sections even
    for (let i = 0; i < sectionsEven.length; i++) {
        sectionsEven[i].style.marginLeft = "-100%";
    }

}

// GAME AREA

// Get all the tags to display scores and timer
const gameArea = document.querySelector("#game"); // game panel
const gameAreaObjects = gameArea.querySelector("#gameobjects"); // game panel
const gameTimer = gameArea.querySelector("#game-timer"); // game timer text
const gameScore = gameArea.querySelector("#game-score"); // game score text
const btnGameStart = gameArea.querySelector("#btn-game-start"); // game start button
const btnFullscreen = gameArea.querySelector("#btn-fullscreen"); // toggle fullscreen button
// store game area width height info
var fullscreen = false;
var gameWidth = window.getComputedStyle(gameArea).width;
var gameHeight = window.getComputedStyle(gameArea).height;
var gameTop = window.getComputedStyle(gameArea).top;
var gameLeft = window.getComputedStyle(gameArea).left;
var gameMargin = window.getComputedStyle(gameArea).margin;
ResizeGamePanel();
// Game start button
btnGameStart.addEventListener("click", () => {
    StartGame();
});

// Full screen button
btnFullscreen.addEventListener("click", () => {
    ToggleFullScreen(!fullscreen);
});


// Toggling full screen
function ToggleFullScreen(toggle) {

    fullscreen = toggle;
    if (toggle) {
        // Fullscreen
        gameArea.style.width = "100vw";
        gameArea.style.height = "100vh";
        gameArea.style.position = "fixed";
        gameArea.style.top = "0";
        gameArea.style.left = "0";
        gameArea.style.margin = "0px";
    }
    else {
        // Back to normal size
        gameArea.style.position = "relative";

        gameArea.style.width = gameWidth;
        gameArea.style.height = gameHeight;
        gameArea.style.top = gameTop;
        gameArea.style.left = gameLeft;
        gameArea.style.margin = gameMargin;
    }
}

// Variables for the game
var timer = 0; // timer countdown
var timerStart = 60; // timer countdown start
var score = 0; // points in game

let gameID = 0; // game loop id
let timerID = 0; // timer id
let spawnID = 0; // spawn id

// Start the game
function StartGame() {
    score = 0; // reset score
    gameScore.innerHTML = "0"; // reset timer text
    btnGameStart.style.display = "none"; // disable button
    gameArea.style.backgroundColor = "#808080"; // change background color
    timer = timerStart; // set timer

    // Use set interval to start game for looping
    gameID = setInterval(GameLoop, 100);
    timerID = setInterval(Countdown, 1000);
    spawnID = setInterval(SpawnTarget, 1200);

    gameTimer.innerHTML = timerStart; // display timer text
}
// End game function
function GameEnd() {
    clearInterval(gameID);
    clearInterval(timerID);
    clearInterval(spawnID);
    btnGameStart.style.display = "block";
    gameAreaObjects.innerHTML = "";
}

// Game loop every 0.1 seconds
function GameLoop() {
    // End game after 60 seconds
    if (timer <= 0) {
        GameEnd();
    }
}

// Countdown timer
function Countdown() {
    gameTimer.innerHTML = timer;
    timer -= 1;

    if (timer == 30) {
        clearInterval(spawnID);
        spawnID = setInterval(SpawnTarget, 600);
    }
}

// spawn target objects
function SpawnTarget() {
    const newLi = document.createElement("img");
    newLi.src = "images/target.png";
    newLi.style.position = "absolute";
    newLi.style.width = "10%";
    newLi.style.top = Math.floor(Math.random() * (80 + 1)) + "%";
    newLi.style.left = Math.floor(Math.random() * (80 + 1)) + "%";
    newLi.style.zIndex = 49;
    newLi.addEventListener("click", () => {
        newLi.remove();
        score++;
        gameScore.innerHTML = score;
    });
    newLi.ondragstart = () => { return false; }; // disable drag
    gameAreaObjects.appendChild(newLi);
}
// When resize into mobile / desktop view, will set the layout for its respective
window.addEventListener("resize", () => {
    FormatPage();
    ToggleFullScreen(false);
    ResizeGamePanel();
});

// Format page based on RWD
function FormatPage() {
    isMobile = IsMobileSize();
    if (isMobile) {
        navSection.style.display = "none";
        // disable / enable back and hamburmenu
        if (athome) {
            btnBack.style.display = "none";
            btnHamburger.style.display = "none";
            navMain.style.display = "grid";
            ToggleSideNavMenu(false);
            navSideMenu.style.display = "none";
        }
        else {
            btnBack.style.display = "block";
            btnHamburger.style.display = "block";
            navMain.style.display = "none";
            navSideMenu.style.display = "block";
        }
    }
    else {
        navSection.style.display = "flex";
        navMain.style.display = "flex"; // set the main nav display to flex
        ToggleSideNavMenu(false);
    }
    if (!athome)
        CreateNavElement(GetListOfSectionTitle(currentPage));
}

// resize game panel so all contents inside is resize as well
function ResizeGamePanel() {
    // get the total width of game panel
    let totalWidth = window.innerWidth - parseFloat(window.getComputedStyle(gameArea).marginLeft) - parseFloat(window.getComputedStyle(gameArea).marginRight);
    gameArea.style.width = totalWidth + "px";
    gameArea.style.height = totalWidth * (8 / 16) + "px";

    gameWidth = window.getComputedStyle(gameArea).width;
    gameHeight = window.getComputedStyle(gameArea).height;
    gameTop = window.getComputedStyle(gameArea).top;
    gameLeft = window.getComputedStyle(gameArea).left;
    gameMargin = window.getComputedStyle(gameArea).margin;
}

// start all starting code
Start();