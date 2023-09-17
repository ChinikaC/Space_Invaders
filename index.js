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
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity

        this.radius = 3
    }

    draw() {
        context.beginPath()
        context.arc(this.position.x,
            this.position.y,
            this.radius,
            0,
            Math.PI * 2)
        context.fillStyle = 'red'
        context.fill()
        context.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Invader {
    constructor({ position }) {
        this.velocity = {
            x: 0,
            y: 0
        }
        const image = new Image()
        image.src = './img/invader.png'
        image.onload = () => {
            const scale = 1
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: position.x,
                y: position.y
            }
        }
    }

    draw() {
        // context.fillStyle = 'yellow('
        // context.fillRect(this.position.x, this.position.y,
        //     this.width, this.height)

        context.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height)
    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        }
    }
}

class Grid {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        this.invaders = []

        const columns = Math.floor(Math.random() * 10 + 5)
        const rows = Math.floor(Math.random() * 5 + 5)
        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                this.invaders.push(
                    new Invader({
                        position: {
                            x: x * 30,
                            y: y * 30
                        }
                    })
                )
            }
        }
        console.log(this.invaders)
    }

    update() {
    }
}

const player = new Player()
const projectiles = []
const grids = [new Grid()]
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
    projectiles.forEach((projectile, index) => {

        if (projectile.position.y + projectile.radius <= 0) {
            setTimeout(() => {
                projectiles.splice(index, 1)
            }, 0)
        } else {
            projectile.update()
        }
    })

    grids.forEach(grid => {
        grid.update()
        grid.invaders.forEach(invader => {
            invader.update()
        })
    })


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
            // console.log('left')
            keys.ArrowLeft.pressed = true
            break
        case 'ArrowRight':
            // console.log('right')
            keys.ArrowRight.pressed = true
            break
        case ' ':
            // console.log('space')
            projectiles.push(new Projectile({
                position: {
                    x: player.position.x + player.width / 2,
                    y: player.position.y
                },
                velocity: {
                    x: 0,
                    y: -10
                }
            })
            )
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