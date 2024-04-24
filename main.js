window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 700;
    canvas.height = 500;

    // create the background image
    const backgroundImage = new Image();
    // create speaker images
    const speakerRightImage = new Image();
    const speakerLeftImage = new Image();
    // Load 24 notes audio
    const notes = [];
    for (let i = 1; i <= 24; i++) {
        let noteNumber = i < 10 ? `0${i}` : i;
        notes.push(new Audio(`assets/piano-notes/key${noteNumber}.mp3`));
    }


    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
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
                console.log("posx:", posx, "posy:", posy, "endx:", endx, "endy:", endy, "click:", x, y)
                console.log("Right speaker was clicked!");
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
                console.log("posx:", posx, "posy:", posy, "endx:", endx, "endy:", endy, "click:", x, y)
                console.log("Left speaker was clicked!");
            }
        }

        drawGameplay(context) {
            // background image
            backgroundImage.onload = () => {
                context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
            }

            // display left and right speakers on top
            speakerRightImage.onload = () => {
                context.drawImage(speakerLeftImage, 50, 50, 200, 200);
            }
            speakerLeftImage.onload = () => {
                context.drawImage(speakerRightImage, canvas.width - 250, 50, 200, 200);
            }

            // A and B buttons
            
            // add onclick on canvas
            canvas.addEventListener("click", (e) => {
                // cursor offset
                const x = e.offsetX;
                const y = e.offsetY;
                this.rightSpeakerClick(x, y);
                this.leftSpeakerClick(x,y);

            })

        }
    }

    const game = new Game(canvas.width, canvas.height);
    console.log(game);

    function animate() {
        game.drawGameplay(ctx);
    }
    window.addEventListener("load", animate());


    // Setting images src
    backgroundImage.src = 'assets/background.jpg';
    speakerRightImage.src = 'assets/speaker-right.png';
    speakerLeftImage.src = 'assets/speaker-left.png';
});