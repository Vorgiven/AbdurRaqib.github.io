const section = document.querySelectorAll("section");
const navButtons = document.querySelectorAll(".nav_button");
const contents = document.querySelectorAll(".content");

section.forEach((entry) => {
    console.log(entry);
});

for(let i = 0;i<navButtons.length;i++){
    navButtons[i].addEventListener("click", function (e) {

        let targetShot = createTargetShot("target-shot", "hello");
        targetShot.style.position = "absolute";
        targetShot.style.top = ((e.clientY + window.scrollY) - 5) + "px";
        targetShot.style.left = (e.clientX - 5) + "px";
        // Append
        document.body.appendChild(targetShot);
        ShowContent(i+1);
    })
}


/*
const ball = document.querySelector("#ball");
ball.style.pointerEvents="none"; // disable events
document.addEventListener("mousemove",
    function (e) {
        var x = e.clientX - ball.getBoundingClientRect().width / 2 ;
        var y = (e.clientY +window.scrollY) - ball.getBoundingClientRect().height / 2;
        ball.style.top = y + "px";
        ball.style.left = x + "px";
    });

*/
function createTargetShot(style, myNum = -1) {
    let b = document.createElement("img");
    b.style.width = 10 + "px";
    b.style.height = 10 + "px";
    b.style.borderRadius = "100px"
    b.classList.add(style);
    b.src = "images/targetHit.png";
    b.style.pointerEvents = "none"; // disable events
    return b;
}
var btnPage_1 = document.querySelector("#nav_btn_1");

console.log(btnPage_1);
HideAllContents();
function HideAllContents() {
    contents.forEach((content) => {
        content.style.display = "none";
    });
}
ShowContent(1);
function ShowContent(pg){
    HideAllContents();
    contents[pg-1].style.display = "grid";
}


