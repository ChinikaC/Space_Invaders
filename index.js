const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height= innerHeight

class Player {
    constructor() {
        this.position = {
            x: 200,
            y: 200
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        const image = new Image()
        image.src = './img/spaceship.png'

        this.image = image
        this.width = 100
        this.height = 100
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
}

const player = new Player()
player.draw()

function animate() {
    requestAnimationFrame(animate)
    context.fillStyle= 'black'
    context.fillRect(0, 0, canvas.width, canvas.height) // 0, 0 is for x and y and starts at the top of the screen
    player.draw()
}

animate()


