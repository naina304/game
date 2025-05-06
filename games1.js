const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundImage = "url('../image1/background.png')"
const context = canvas.getContext('2d');
let gravity = 1;
const platImage = new Image();
platImage.src = "../image1/image.png";
//let total image=6;
const standImage = new Image();
standImage.src = "../image1/spriteStandRight.png";
const runrightImage = new Image();
runrightImage.src = "../image1/spriteRunRight.png";
const runleftImage = new Image();
runleftImage.src = "image1/runleft.png";
const standleftImage = new Image()
standleftImage.src = "../image1/spriteStandLeft.png";
//const backImage=new Image()
//backImage.src="hills.png";



let offset = 0;

class Platform {
    constructor(x, y, width, height, color) {
        this.position = { x, y }
        this.width = width;
        this.height = height;
        this.color = color;
    }
    draw() {
        //context.fillRect(this.position.x, this.position.y, this.width, this.height, this.color);
        context.drawImage(platImage, this.position.x, this.position.y)
        //context.fillStyle = "red";
        // context.DrawImage(platImage)
    }
}


class Player {
    constructor(x, y, height, width) {
        this.position = { x, y };
        this.velocity = { x: 0, y: 2 };
        //this.Position.x=100;
        //this.Position.y=100;    
        this.width = 66;
        this.height = 150;
        this.color = "yellow";
        this.frams = 1;

    }

    draw() {
        // context.fillStyle = this.color;
        //context.fillRect(this.position.x, this.position.y, this.width, this.height, this.color);
        if (this.velocity.y == 0 && this.velocity.x == 0)
            context.drawImage(standImage, 177, 0, 177, 400, this.position.x, this.position.y, this.width, this.height)
        if (this.velocity.x > 0)
            context.drawImage(runrightImage, 340 * this.frams, 0, 340, 400, this.position.x, this.position.y, 120, this.height)
        if (this.velocity.x < 0)
            context.drawImage(runleftImage, 340 * this.frams, 0, 340, 400, this.position.x, this.position.y, 120, this.height)
        //if(this.velocity.x==0&&this.velocity.y==0)
        //context.drawImage(standleftImage,177,0,177,400,this.position.x,this.position.y,this.height) 
    }
    playerMovement() {
        this.frams++;
        if (this.frams > 24)
            this.frams = 1;
        console.log(this.frams);
        this.velocity.y += gravity;
        if ((this.position.y + this.height + this.velocity.y) >= canvas.height) { this.velocity.y = 0; }


        for (let i = 0; i < arr.length; i++) {
            if ((this.position.x + this.width - 5 + this.velocity.x >= arr[i].position.x) &&
                (this.position.x < arr[i].position.x + arr[i].width) &&
                (this.position.y + this.height + this.velocity.y - 1 >= arr[i].position.y) &&
                (this.position.y < arr[i].position.y + 20)) { this.velocity.y = 0 }


            arr[i].position.x += offset;

            if ((this.position.x + this.width >= arr[i].position.x) &&
                (this.position.x <= arr[i].position.x + arr[i].width) &&
                (this.position.y >= arr[i].position.y) &&
                (this.position.y <= arr[i].position.y + arr[i].height))
                this.velocity.x = 0;


        }

        this.position.x += this.velocity.x;

        this.position.y += this.velocity.y;

        this.draw();
    }
}


function test() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(test);
    player.playerMovement();
    platform.draw();
    platform1.draw();
    platform2.draw();


}
addEventListener('keydown', function (e) {


    if (e.key == 'ArrowUp') {
        (player.position.y + player.height > canvas.height - 1)
        player.velocity.y = -25;
    }
    if (e.key == 'ArrowRight') {
        player.velocity.x = 2;
        offset = -5
    }
    if (e.key == 'ArrowLeft') {
        player.velocity.x = -2;
        offset = 5

    }


})

addEventListener('keyup', function (e) {

    if (e.key == 'ArrowRight') {
        player.velocity.x = 0;
        offset = 0;

    }
    if (e.key == 'ArrowLeft') {

        player.velocity.x = 0;
        offset = 0

    }

})

let arr = [];


let platform = new Platform(0, 700, 200, 50);
arr.push(platform);
let platform1 = new Platform(290, 750, 200, 50);
arr.push(platform1);
let platform2 = new Platform(800, 750, 200, 60,);
arr.push(platform2);
let player = new Player(0, 60);

test();
