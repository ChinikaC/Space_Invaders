const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height= innerHeight

class Player {
    constructor() {
        this.velocity = {
            x: 0,
            y: 0
        }

        const image = new Image()
        image.src = './img/spaceship.png'
        image.onload = () => {
            const scale = 0.15
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 20
            }
        }
    }

    draw() {
        // context.fillStyle = 'yellow'
        // context.fillRect(this.position.x, this.position.y,
        //     this.width, this.height)
        context.drawImage(
            this.image, 
            this.position.x,
            this.position.y, 
            this.width, 
            this.height)
    }

    update(){
        if (this.image) {
        this.draw()
        this.position.x += this.velocity.x
    }
    }
}

const player = new Player()
const keys = {
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    space: {
        pressed: false
    }

}

function animate() {
    requestAnimationFrame(animate)
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height) // 0, 0 is for x and y and starts at the top of the screen
    player.update()
}

animate()

addEventListener('keydown', ({key}) => {
    switch (key){
        case 'ArrowLeft':
            console.log('left')
            player.velocity.x = -5
            keys.ArrowLeft.pressed = true
            break
        case 'ArrowRight':
            console.log('right')
            keys.ArrowRight.pressed = true
            break
        case ' ':
                console.log('space')
                break
    }
})


