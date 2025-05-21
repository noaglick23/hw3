// Due to browser restrictions, the music did not play automatically, so I had to add a music control button.

// Background tune
const backgroundMusic = document.getElementById('backgroundMusic');
const toggleMusicButton = document.getElementById('toggleMusicButton');

// --- Setting volume levels ---
const ANIMAL_SOUND_VOLUME = 0.9; 
const BACKGROUND_MUSIC_VOLUME = 0.05; 

if (backgroundMusic && toggleMusicButton) {
    backgroundMusic.volume = BACKGROUND_MUSIC_VOLUME;

    toggleMusicButton.textContent = '🔇'; // Default-  mute 


    // control - on & off of the background music
    toggleMusicButton.addEventListener('click', () => {
        if (backgroundMusic.muted) { 
            backgroundMusic.muted = false; 
            backgroundMusic.play().catch(e => {
                console.error("Error playing background music:", e);
                alert("Playback of background music failed. Please check browser settings.");
            });
            toggleMusicButton.textContent = '🔊';
        } else { 
            backgroundMusic.muted = true; 
            toggleMusicButton.textContent = '🔇'; 
        }
    });
}



let currentPlayingAudio = null;
let currentPlayingVideoElement = null;

function handleAnimalInteraction(key, buttonElement) {
    if (currentPlayingAudio && !currentPlayingAudio.paused) {
        currentPlayingAudio.pause();
        currentPlayingAudio.currentTime = 0;
    }

    if (currentPlayingVideoElement) {
        currentPlayingVideoElement.pause();
        currentPlayingVideoElement.currentTime = 0;
        if (currentPlayingVideoElement.parentNode) {
            currentPlayingVideoElement.parentNode.removeChild(currentPlayingVideoElement);
        }
        currentPlayingVideoElement = null;
    }

    let audio;
    let videoSrc = null;

    switch (key) {
        case 'elephant':
            audio = new Audio("./sounds/elephant_sound.mp3");
            videoSrc = "./elephant.mp4";
            break;
        case 'gorilla':
            audio = new Audio("./sounds/gorilla.mp3");
            videoSrc = "./gorilla.mp4";
            break;
        case 'monkey':
            audio = new Audio("./sounds/monkey_sound.mp3");
            videoSrc = "./monkey.mp4";
            break;
        case 'frog':
            audio = new Audio("./sounds/frog_sound.mp3");
            videoSrc = "./frog.mp4";
            break;
        case 'lion':
            audio = new Audio("./sounds/lion_sound.mp3");
            videoSrc = "./lion.mp4";
            break;
        case 'tiger':
            audio = new Audio("./sounds/tiger_sound.mp3");
            videoSrc = "./tiger.mp4";
            break;
        case 'snake':
            audio = new Audio("./sounds/snake_sound.mp3");
            videoSrc = "./snake.mp4";
            break;
        default:
            console.log("No sound assigned for key:", key);
            return;
    }

    // --- חשוב: הגדרת עוצמת קול לכל צליל חיה ---
    if (audio) {
        audio.volume = ANIMAL_SOUND_VOLUME; // הגדר את עוצמת הקול של צליל החיה
        audio.play().catch(e => console.error("Error playing audio:", e));
        currentPlayingAudio = audio;
    }

    if (videoSrc) {
        const newVideoElement = document.createElement('video');
        newVideoElement.src = videoSrc;
        newVideoElement.loop = true;
        newVideoElement.muted = true; // נשאיר את הוידאו מושתק כדי לא להפריע לצלילים
        newVideoElement.playsInline = true;
        newVideoElement.classList.add('animal-video');

        const spanElement = buttonElement.querySelector('span');
        if (spanElement) {
            buttonElement.insertBefore(newVideoElement, spanElement);
        } else {
            buttonElement.appendChild(newVideoElement);
        }

        newVideoElement.play().catch(e => console.error("Error playing video:", e));
        currentPlayingVideoElement = newVideoElement;

        if (!newVideoElement.loop) {
            newVideoElement.onended = () => {
                console.log(`${key} video ended. Cleaning up.`);
                if (newVideoElement.parentNode) {
                    newVideoElement.parentNode.removeChild(newVideoElement);
                }
                buttonElement.classList.remove('pressed');
                if (currentPlayingVideoElement === newVideoElement) {
                    currentPlayingVideoElement = null;
                }
            };
        }
    }
}

function buttonAnimation(currentElement) {
    if (currentElement) {
        currentElement.classList.add("pressed");

        if (!currentElement.querySelector('.animal-video')) {
            setTimeout(function() {
                currentElement.classList.remove("pressed");
            }, 100);
        }
    }
}

var animalButtons = document.querySelectorAll(".animal-button");

for (var i = 0; i < animalButtons.length; i++) {
    animalButtons[i].addEventListener("click", function() {
        const animalKey = Array.from(this.classList).find(cls =>
            !['animal-button', 'pressed'].includes(cls)
        );
        if (animalKey) {
            handleAnimalInteraction(animalKey, this);
            buttonAnimation(this);
        }
    });
}

document.addEventListener("keypress", function(event) {
    let pressedKey = event.key.toLowerCase();

    let keyToPlay;
    let buttonToAnimate;

    switch (pressedKey) {
        case 'e':
            keyToPlay = 'elephant';
            buttonToAnimate = document.querySelector('.elephant');
            break;
        case 'g':
            keyToPlay = 'gorilla';
            buttonToAnimate = document.querySelector('.gorilla');
            break;
        case 'm':
            keyToPlay = 'monkey';
            buttonToAnimate = document.querySelector('.monkey');
            break;
        case 'f':
            keyToPlay = 'frog';
            buttonToAnimate = document.querySelector('.frog');
            break;
        case 'l':
            keyToPlay = 'lion';
            buttonToAnimate = document.querySelector('.lion');
            break;
        case 't':
            keyToPlay = 'tiger';
            buttonToAnimate = document.querySelector('.tiger');
            break;
        case 's':
            keyToPlay = 'snake';
            buttonToAnimate = document.querySelector('.snake');
            break;
        default:
            console.log("No animal assigned to this key:", pressedKey);
            return;
    }

    if (keyToPlay && buttonToAnimate) {
        handleAnimalInteraction(keyToPlay, buttonToAnimate);
        buttonAnimation(buttonToAnimate);
    }
});
