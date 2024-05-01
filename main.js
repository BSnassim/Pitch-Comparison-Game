window.addEventListener('load', function () {
    // background canvas
    const bgCanvas = document.getElementById('background');
    const bgCtx = bgCanvas.getContext('2d');
    bgCanvas.width = 700;
    bgCanvas.height = 500;
    // main menu canvas
    const menuCanvas = document.getElementById('mainmenu');
    const menuCtx = menuCanvas.getContext('2d');
    menuCanvas.width = 700;
    menuCanvas.height = 500;
    // speakers canvas
    const speakerRCanvas = document.getElementById('speakerR');
    const speakerRCtx = speakerRCanvas.getContext('2d');
    speakerRCanvas.width = 700;
    speakerRCanvas.height = 500;
    // speakers canvas
    const speakerLCanvas = document.getElementById('speakerL');
    const speakerLCtx = speakerLCanvas.getContext('2d');
    speakerLCanvas.width = 700;
    speakerLCanvas.height = 500;
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
        popupCtx.fillStyle = "rgb(75, 173, 66)";
        popupCtx.beginPath();
        popupCtx.moveTo(270, 75);
        popupCtx.arcTo(470, 75, 470, 155, 30);
        popupCtx.arcTo(470, 155, 240, 155, 30);
        popupCtx.arcTo(240, 155, 240, 75, 30);
        popupCtx.arcTo(240, 75, 470, 75, 30);
        popupCtx.closePath();
        popupCtx.fill();
        popupCtx.strokeStyle = "black";
        popupCtx.lineWidth = 2;
        popupCtx.stroke();
        popupCtx.fillStyle = "white";
        popupCtx.fillText("Good job !", 280, 120);
        setTimeout(() => {
            popupCtx.clearRect(0, 0, canvas.width, canvas.height)
        }, 2000);
    }
    const failurePopup = () => {
        popupCtx.font = "30px Arial";
        popupCtx.fillStyle = "rgb(166, 61, 61)";
        popupCtx.beginPath();
        popupCtx.moveTo(270, 75);
        popupCtx.arcTo(470, 75, 470, 155, 30);
        popupCtx.arcTo(470, 155, 240, 155, 30);
        popupCtx.arcTo(240, 155, 240, 75, 30);
        popupCtx.arcTo(240, 75, 470, 75, 30);
        popupCtx.closePath();
        popupCtx.fill();
        popupCtx.strokeStyle = "black";
        popupCtx.lineWidth = 2;
        popupCtx.stroke();
        popupCtx.fillStyle = "white";
        popupCtx.fillText("Try again !", 280, 120);
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
        drawSpeakers() {
            // display left and right speakers on top
            speakerLeftImage.onload = () => {
                speakerLCtx.drawImage(speakerLeftImage, canvas.width - 250, 50, 200, 200);
            }
            speakerRightImage.onload = () => {
                speakerRCtx.drawImage(speakerRightImage, 50, 50, 200, 200);
            }
        }
        drawButtons(context) {
            // A and B buttons
            buttonAImage.onload = () => {
                context.drawImage(buttonAImage, 100, 300, 85, 70);
            }
            buttonBImage.onload = () => {
                context.drawImage(buttonBImage, 500, 300, 85, 70);
            }
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
            notes[this.A].play();
            this.animateRightSpeaker();
            setTimeout(() => {
                notes[this.B].play();
                this.animateLeftSpeaker();
            }, 2000);
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
                this.animateLeftSpeaker();
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
                console.log("Left speaker was clicked!");
                notes[this.A].play();
                this.animateRightSpeaker();
            }
        }

        animateRightSpeaker() {
            const startY = 50; // Initial y position
            let shakeDistance = 5; // How much to shake
            let currentTime = 0; // Track animation time
            let isAnimating = true; // Flag to control animation

            const animate = () => {
                if (!isAnimating) return; // Stop animation if flag is false

                // Clear previous drawing
                speakerRCtx.clearRect(0, 0, speakerRCanvas.width, speakerRCanvas.height);

                // Calculate next position (shaking up and down)
                const currentY = startY + shakeDistance * Math.sin(currentTime * Math.PI * 2);

                // Draw speaker at current position
                speakerRCtx.drawImage(speakerRightImage, 50, currentY, 200, 200);

                // Update animation time
                currentTime += 0.02; // Adjust speed as needed

                // Stop animation after 1 second
                if (currentTime >= 1) {
                    isAnimating = false;
                    // setTimeout(() => {
                    //     // Clear the canvas after animation stops
                    //     speakerRCtx.clearRect(0, 0, speakerRCanvas.width, speakerRCanvas.height);
                    // }, 100);
                    return;
                }

                // Continue animation
                requestAnimationFrame(animate);
            };

            // Start animation loop
            animate();
        }
        animateLeftSpeaker() {
            const startY = 50; // Initial y position
            let shakeDistance = 5; // How much to shake
            let currentTime = 0; // Track animation time
            let isAnimating = true; // Flag to control animation

            const animate = () => {
                if (!isAnimating) return; // Stop animation if flag is false

                // Clear previous drawing
                speakerLCtx.clearRect(0, 0, speakerLCanvas.width, speakerLCanvas.height);

                // Calculate next position (shaking up and down)
                const currentY = startY + shakeDistance * Math.sin(currentTime * Math.PI * 2);

                // Draw speaker at current position
                speakerLCtx.drawImage(speakerLeftImage, speakerLCanvas.width - 250, currentY, 200, 200);

                // Update animation time
                currentTime += 0.02; // Adjust speed as needed

                // Stop animation after 1 second
                if (currentTime >= 1) {
                    isAnimating = false;
                    // setTimeout(() => {
                    //     // Clear the canvas after animation stops
                    //     speakerLCtx.clearRect(0, 0, speakerLCanvas.width, speakerLCanvas.height);
                    // }, 100);
                    return;
                }

                // Continue animation
                requestAnimationFrame(animate);
            };

            // Start animation loop
            animate();
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
                if (this.A > this.B) {
                    successPopup();
                    setTimeout(() => {
                        this.setNotesAB();
                    }, 2000);
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
                if (this.B > this.A) {
                    successPopup();
                    this.setNotesAB();
                } else {
                    failurePopup();
                }
            }
        }
        startGame() {
            this.setNotesAB();
            this.drawGameplay(ctx);
        }
        drawMainMenu(context) {
            // Drawing start game button
            const buttonWidth = 200;
            const buttonHeight = 50;
            const buttonX = (canvas.width - buttonWidth) / 2;
            const buttonY = (canvas.height - buttonHeight) / 2;

            context.fillStyle = "rgb(96, 149, 181)";
            context.strokeStyle = "black";
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(buttonX + 10, buttonY);
            context.lineTo(buttonX + buttonWidth - 10, buttonY);
            context.quadraticCurveTo(buttonX + buttonWidth, buttonY, buttonX + buttonWidth, buttonY + 10);
            context.lineTo(buttonX + buttonWidth, buttonY + buttonHeight - 10);
            context.quadraticCurveTo(buttonX + buttonWidth, buttonY + buttonHeight, buttonX + buttonWidth - 10, buttonY + buttonHeight);
            context.lineTo(buttonX + 10, buttonY + buttonHeight);
            context.quadraticCurveTo(buttonX, buttonY + buttonHeight, buttonX, buttonY + buttonHeight - 10);
            context.lineTo(buttonX, buttonY + 10);
            context.quadraticCurveTo(buttonX, buttonY, buttonX + 10, buttonY);
            context.closePath();
            context.fill();
            context.stroke();

            context.fillStyle = "white";
            context.font = "20px Arial";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText("Start game", buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);

            // add onclick on canvas
            menuCanvas.addEventListener("click", (e) => {
                // cursor offset
                const x = e.offsetX;
                const y = e.offsetY;
                // top left positions of element
                const posx = buttonX;
                const posy = buttonY;
                // bottom right positions of element
                const endx = posx + buttonWidth;
                const endy = posy + buttonHeight;
                // action
                if ((x > posx && y > posy) && (x < endx && y < endy)) {
                    console.log("Start game!");
                    menuCanvas.style.display = "none";
                    this.startGame();
                }
            })
        }
        drawGameplay(context) {
            this.drawSpeakers();
            this.drawButtons(context);
            // Setting images src
            speakerLeftImage.src = 'assets/speaker-left.png';
            speakerRightImage.src = 'assets/speaker-right.png';
            buttonAImage.src = 'assets/buttonA.png';
            buttonBImage.src = 'assets/buttonB.png';
            // Text
            context.font = "30px Arial";
            context.fillStyle = "rgb(89, 156, 240)";
            context.fillRect(110, 400, 460, 80); // background
            context.strokeStyle = "black";
            context.lineWidth = 2;
            context.strokeRect(110, 400, 460, 80); // border
            context.fillStyle = "black";
            context.fillText("Which tone has the higher pitch ?", 120, 450);

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
    backgroundImage.src = 'assets/background.jpg';

    function animate() {
        game.drawMainMenu(menuCtx);
    }
    window.addEventListener("load", animate());

});