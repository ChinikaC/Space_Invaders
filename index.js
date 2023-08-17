const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Player {
    constructor() {
        this.velocity = {
            x: 0,
            y: 0
        }

        this.rotation = 0

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
        // context.fillStyle = 'yellow('
        // context.fillRect(this.position.x, this.position.y,
        //     this.width, this.height)

        context.save()
        context.translate(
            player.position.x + player.width / 2,
            player.position.y + player.height / 2
        )
        context.rotate(this.rotation)

        context.translate(
            -player.position.x - player.width / 2,
            -player.position.y - player.height / 2
        )

        context.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height)

        context.restore()
    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
        }
    }
}

class Projectile {
    constructor({position, velocity}) {
        this.position = position // this is dynamic which is why we passed it in above
        this.velocity = velocity // this is dynamic which is why we passed it in above
        this.radius = 3 // this is static which is why we did not passed it in above

    }

    draw(){
        context.beginPath()
        context.arc()
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

    if (keys.ArrowLeft.pressed && player.position.x >= 0) {
        player.velocity.x = -5
        player.rotation = -0.15
    } else if (keys.ArrowRight.pressed &&
        player.position.x + player.width <= canvas.width) {
        player.velocity.x = 5
        player.rotation = 0.15
    } else {
        player.velocity.x = 0
        player.rotation = 0
    }
}

animate()

addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'ArrowLeft':
            console.log('left')
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

addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'ArrowLeft':
            console.log('left')
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight':
            console.log('right')
            keys.ArrowRight.pressed = false
            break
        case ' ':
            console.log('space')
            break
    }
})


