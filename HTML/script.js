const petalContainer = document.getElementById("petals");

function createPetal() {

    const petal = document.createElement("span");

    petal.innerHTML = "🌸";

    petal.style.position = "fixed";
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.top = "-30px";

    petal.style.fontSize =
        Math.random() * 10 + 10 + "px";

    petal.style.opacity =
        Math.random() * 0.5 + 0.3;

    petal.style.pointerEvents = "none";
    petal.style.zIndex = "15";

    const duration =
        Math.random() * 8 + 7;

    petal.style.transition =
        `transform ${duration}s linear, top ${duration}s linear`;

    petalContainer.appendChild(petal);

    requestAnimationFrame(() => {

        petal.style.top = "105vh";

        petal.style.transform =
            `translateX(${Math.random() * 200 - 100}px)
             rotate(${Math.random() * 720}deg)`;
    });

    setTimeout(() => {
        petal.remove();
    }, duration * 1000);
}

setInterval(createPetal, 1800);

const gardenCard = document.querySelector(".garden-card");

function createFallingLeaf() {
    if (!gardenCard) return;

    const leaf = document.createElement("img");

    leaf.src = "./images/cherryleaftwo.png";
    leaf.classList.add("falling-leaf");

    leaf.style.left = `${25 + Math.random() * 25}%`;
    leaf.style.top = `${20 + Math.random() * 20}%`;

    gardenCard.appendChild(leaf);

    setTimeout(() => {
        leaf.remove();
    }, 5000);
}

setInterval(createFallingLeaf, 3500);

const catWalking = document.querySelector(".cat-walking");
const catSleeping = document.querySelector(".cat-sleeping");

let catX = 20;
let direction = 1;
let isSleeping = false;
let isPaused = false;

const catSpeed = 0.25;

// ---------------- CAT MOVEMENT ----------------

function moveCat() {

    if (!isSleeping && !isPaused) {

        const maxX =
            gardenCard.clientWidth -
            catWalking.offsetWidth -
            20;

        catX += catSpeed * direction;

        // Right side
        if (catX >= maxX) {
            catX = maxX;
            direction = -1;

            catWalking.style.transform = "scaleX(-1)";

            pauseCat();
        }

        // Left side
        if (catX <= 20) {
            catX = 20;
            direction = 1;

            catWalking.style.transform = "scaleX(1)";

            pauseCat();
        }

        catWalking.style.left = `${catX}px`;
    }

    requestAnimationFrame(moveCat);
}


// ---------------- RANDOM PAUSES ----------------

function pauseCat() {

    if (isSleeping) return;

    isPaused = true;

    // Pause for 1.5–3 seconds
    const pauseTime =
        Math.random() * 1500 + 1500;

    setTimeout(() => {

        if (!isSleeping) {
            isPaused = false;
        }

    }, pauseTime);
}


// Randomly pause while walking
function randomPause() {

    if (isSleeping || isPaused) return;

    isPaused = true;

    // Pause for 1–2.5 seconds
    const pauseTime =
        Math.random() * 1500 + 1000;

    setTimeout(() => {

        if (!isSleeping) {
            isPaused = false;
        }

    }, pauseTime);

    // Schedule another random pause
    scheduleRandomPause();
}


function scheduleRandomPause() {

    // Wait 4–8 seconds before another pause
    const nextPause =
        Math.random() * 4000 + 4000;

    setTimeout(randomPause, nextPause);
}


// ---------------- CLICK TO SLEEP ----------------

catWalking.addEventListener("click", () => {

    if (isSleeping) return;

    isSleeping = true;
    isPaused = true;

    // Hide walking cat
    catWalking.style.display = "none";

    // Show sleeping cat
    catSleeping.style.display = "block";

    // Keep sleeping cat in the same position
    catSleeping.style.left = `${catX}px`;

    // Wake up after 4 seconds
    setTimeout(() => {

        catSleeping.style.display = "none";

        catWalking.style.display = "block";

        isSleeping = false;
        isPaused = false;

    }, 4000);
});


// ---------------- START ----------------

catWalking.style.left = `${catX}px`;

moveCat();
scheduleRandomPause();