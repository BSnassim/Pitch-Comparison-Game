window.addEventListener('load', function () {
    // background canvas
    const bgCanvas = document.getElementById('background');
    const bgCtx = bgCanvas.getContext('2d');
    bgCanvas.width = 700;
    bgCanvas.height = 500;
    // popup canvas
    const popupCanvas = document.getElementById('popup');
    const popupCtx = popupCanvas.getContext('2d');
    popupCanvas.width = 700;
    popupCanvas.height = 500;
    // game canvas
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 700;
    canvas.height = 500;

    // create the background image
    const backgroundImage = new Image();
    // create speaker images
    const speakerRightImage = new Image();
    const speakerLeftImage = new Image();
    // create buttons images
    const buttonAImage = new Image();
    const buttonBImage = new Image();
    // Load 24 notes audio
    const notes = [];
    for (let i = 1; i <= 24; i++) {
        let noteNumber = i < 10 ? `0${i}` : i;
        notes.push(new Audio(`assets/piano-notes/key${noteNumber}.mp3`));
    }

    const successPopup = () => {
        popupCtx.font = "30px Arial";
        popupCtx.fillStyle = "grey";
        popupCtx.fillRect(240, 50, 230, 100); // background
        popupCtx.strokeStyle = "black";
        popupCtx.lineWidth = 2;
        popupCtx.strokeRect(240, 50, 230, 100); // border
        popupCtx.fillStyle = "white";
        popupCtx.fillText("Good job !", 280, 105);
        setTimeout(() => {
            popupCtx.clearRect(0, 0, canvas.width, canvas.height)
        }, 2000);
    }
    const failurePopup = () => {
        popupCtx.font = "30px Arial";
        popupCtx.fillStyle = "grey";
        popupCtx.fillRect(240, 50, 230, 100); // background
        popupCtx.strokeStyle = "black";
        popupCtx.lineWidth = 2;
        popupCtx.strokeRect(240, 50, 230, 100); // border
        popupCtx.fillStyle = "white";
        popupCtx.fillText("Try again", 290, 105);
        setTimeout(() => {
            popupCtx.clearRect(0, 0, canvas.width, canvas.height)
        }, 2000);
    }


    class Game {
        width;
        height;
        A;
        B;
        constructor(width, height) {
            this.width = width;
            this.height = height;
        }
        setNotesAB() {
            // Set random notes to A & B
            let noteA = Math.floor(Math.random() * 24) + 1;
            let noteB = Math.floor(Math.random() * 24) + 1;

            while (noteA === noteB) {
                noteB = Math.floor(Math.random() * 24) + 1;
            }

            this.A = noteA;
            this.B = noteB;
        }
        rightSpeakerClick(x, y) {
            // top left positions of element
            const posx = canvas.width - 250;
            const posy = 50;
            // bottom right positions of element
            const endx = posx + 200;
            const endy = posy + 200;
            // action
            if ((x > posx && y > posy) && (x < endx && y < endy)) {
                // Stop audio if playing
                notes.forEach(note => {
                    if (!note.paused) {
                        note.pause();
                        note.currentTime = 0;
                    }
                });
                console.log("posx:", posx, "posy:", posy, "endx:", endx, "endy:", endy, "click:", x, y)
                console.log("Right speaker was clicked!");
                notes[this.B].play();
            }
        }
        leftSpeakerClick(x, y) {
            // top left positions of element
            const posx = 50;
            const posy = 50;
            // bottom right positions of element
            const endx = posx + 200;
            const endy = posy + 200;
            // action
            if ((x > posx && y > posy) && (x < endx && y < endy)) {
                // Stop audio if playing
                notes.forEach(note => {
                    if (!note.paused) {
                        note.pause();
                        note.currentTime = 0;
                    }
                });
                console.log("posx:", posx, "posy:", posy, "endx:", endx, "endy:", endy, "click:", x, y)
                console.log("Right speaker was clicked!");
                notes[this.A].play();
            }
        }
        buttonAClick(x, y) {
            // top left positions of element
            const posx = 100;
            const posy = 300;
            // bottom right positions of element
            const endx = posx + 85;
            const endy = posy + 70;
            // action
            if ((x > posx && y > posy) && (x < endx && y < endy)) {
                console.log("posx:", posx, "posy:", posy, "endx:", endx, "endy:", endy, "click:", x, y)
                console.log("Button A was clicked!");
                // Display the text message
                if (this.A>this.B){
                    successPopup();
                    this.setNotesAB();
                } else {
                    failurePopup();
                }
            }
        }
        buttonBClick(x, y) {
            // top left positions of element
            const posx = 500;
            const posy = 300;
            // bottom right positions of element
            const endx = posx + 85;
            const endy = posy + 70;
            // action
            if ((x > posx && y > posy) && (x < endx && y < endy)) {
                console.log("posx:", posx, "posy:", posy, "endx:", endx, "endy:", endy, "click:", x, y)
                console.log("Button B was clicked!");
                // Display the text message
                if (this.B>this.A){
                    successPopup();
                    this.setNotesAB();
                } else {
                    failurePopup();
                }
            }
        }

        drawGameplay(context) {
            // display left and right speakers on top
            speakerRightImage.onload = () => {
                context.drawImage(speakerLeftImage, 50, 50, 200, 200);
            }
            speakerLeftImage.onload = () => {
                context.drawImage(speakerRightImage, canvas.width - 250, 50, 200, 200);
            }

            // A and B buttons
            buttonAImage.onload = () => {
                context.drawImage(buttonAImage, 100, 300, 85, 70);
            }
            buttonBImage.onload = () => {
                context.drawImage(buttonBImage, 500, 300, 85, 70);
            }

            // Text
            ctx.font = "30px Arial";
            ctx.fillStyle = "rgb(89, 156, 240)";
            ctx.fillRect(140, 400, 460, 80); // background
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.strokeRect(140, 400, 460, 80); // border
            ctx.fillStyle = "black";
            ctx.fillText("Which tone has the higher pitch ?", 150, 450);

            // add onclick on canvas
            popupCanvas.addEventListener("click", (e) => {
                // cursor offset
                const x = e.offsetX;
                const y = e.offsetY;
                this.rightSpeakerClick(x, y);
                this.leftSpeakerClick(x, y);
                this.buttonAClick(x, y)
                this.buttonBClick(x, y)

            })


        }
    }

    const game = new Game(canvas.width, canvas.height);
    console.log(game);
    // background image
    backgroundImage.onload = () => {
        bgCtx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    }

    function animate() {
        game.setNotesAB();
        game.drawGameplay(ctx);
    }
    window.addEventListener("load", animate());


    // Setting images src
    backgroundImage.src = 'assets/background.jpg';
    speakerLeftImage.src = 'assets/speaker-left.png';
    speakerRightImage.src = 'assets/speaker-right.png';
    buttonAImage.src = 'assets/buttonA.png';
    buttonBImage.src = 'assets/buttonB.png';
});