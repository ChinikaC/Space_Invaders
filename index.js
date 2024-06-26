const scoreElement = document.querySelector('#scoreElement')
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

console.log(scoreElement)

canvas.width = 1024
canvas.height = 576

class Player {
    constructor() {
        this.velocity = {
            x: 0,
            y: 0
        }

        this.rotation = 0
        this.opacity = 1

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
        context.globalAlpha = this.opacity
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
        this.radius = 4
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

class Particle {
    constructor({ position, velocity, radius, color, fades }) {
        this.position = position
        this.velocity = velocity
        this.radius = radius
        this.color = color
        this.opacity = 1
        this.fades = fades //passed through a constructor argument
    }

    draw() {
        context.save()
        context.globalAlpha = this.opacity //globalAlpha sets the transparency of the context
        context.beginPath()
        context.arc(this.position.x,
            this.position.y,
            this.radius,
            0,
            Math.PI * 2)
        context.fillStyle = this.color
        context.fill()
        context.closePath()
        context.restore()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.fades) this.opacity -= 0.01
    }
}

class invaderProjectile {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.width = 3
        this.height = 10
    }
    draw() {
        context.fillStyle = 'white'
        context.fillRect(this.position.x, this.position.y,
            this.width, this.height) 
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
    update({velocity}) {
        if (this.image) {
            this.draw()
            this.position.x += velocity.x
            this.position.y += velocity.y
        }
    }
    shoot(invaderProjectiles){
        invaderProjectiles.push(new invaderProjectile({
            position: {
        x: this.position.x + this.width/2,
        y: this.position.y + this.height
    },
    velocity: {
        x:0, 
        y:5
    }
})
        )
    }
}

class Grid {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }

        this.velocity = {
            x: 3,
            y: 0
        }

        this.invaders = []

        const columns = Math.floor(Math.random() * 10 + 5)
        const rows = Math.floor(Math.random() * 5 + 5)

        this.width = columns * 30 // 30 is the width of the actual invader

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
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.velocity.y = 0

        if (this.position.x + this.width >= canvas.width || 
            this.position.x <= 0){
            this.velocity.x = -this.velocity.x
            this.velocity.y = 30
        }
    }
}

const player = new Player()
const projectiles = []
const grids = []
const invaderProjectiles = []
const particles = []
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

// Variables
let frames = 0
let randomInterval = Math.floor(Math.random() * 500 + 500)
let game = {
    over: false,
    active: true
}
let score = 0

// The stars in the background
for (let i = 0; i <100; i++){     
    particles.push(new Particle({
                position: {
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height
                },
                velocity: {
                    x: 0,
                    y: 0.3
                },
                radius: Math.random() * 2, 
                color: 'white'
            })
        )
        }

function createParticles({object, color, fades}){
    for (let i = 0; i <15; i++){ // for i, we create 15 partciles per hit and then we add onto i    
        particles.push(new Particle({
                    position: {
                        x: object.position.x + object.width /2,
                        y: object.position.y + object.height /2
                    },
                    velocity: {
                        x: (Math.random() - 0.5) * 2, // Adding -0.5 makes the particles go in different directions
                        y: (Math.random() - 0.5) * 2
                    },
                    radius: Math.random() * 3, // Makes the particles smaller - gives more of an explosion effect
                    color: color || '#BAA0DE',
                    fades: true
                })
            )
            }
}

function animate(){
    if (!game.active) return
    requestAnimationFrame(animate)
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height) // 0, 0 is for x and y and starts at the top of the screen
    player.update()
    // Rendering out the particles
    particles.forEach((particle, i) => {
        if (particle.position.y - particle.radius >= canvas.height){
            particle.position.x = Math.random() * canvas.width
            particle.position.y = - particle.radius // so more particles (stars) are created from the top when the particles move to the bottom
        }
        if (particle.opacity <= 0){
            setTimeout(() => {
                particles.splice(i, 1)
            },0)
        } else {
        particle.update()
        }
})

console.log(particles)

    invaderProjectiles.forEach((invaderProjectile, index) => {
        if (invaderProjectile.position.y + invaderProjectile.height
            >= canvas.height){
                setTimeout(() => {
                    invaderProjectiles.splice(index, 1)
                }, 0)
            } else invaderProjectile.update()

            // When projectile hits player
            if (invaderProjectile.position.y + invaderProjectile.height
                >= player.position.y && invaderProjectile.position.x +
            invaderProjectile.width >= player.position.x &&
        invaderProjectile.position.x <= player.position.x +
    player.width){

        console.log('you lose!')
        setTimeout(() => {
            invaderProjectiles.splice(index, 1)
            player.opacity = 0
            game.over =true
        }, 0)
// Once the player gets hit by a projectile and disappears, the game ends:
        setTimeout(() => {
            game.active = false
        }, 2000) // 2000 miliseconds that it takes for the game to end
                    createParticles({
                        object: player,
                        color: 'white',
                        fades: true
                    })
                }
    })

    projectiles.forEach((projectile, index) => {
        if (projectile.position.y + projectile.radius <= 0) {
            setTimeout(() => {
                projectiles.splice(index, 1)
            }, 0)
        } else {
            projectile.update()
        }
    })

    grids.forEach((grid, gridIndex) => {
        grid.update()

        // spawn projectiles
        if (frames % 100 === 0 && grid.invaders.length > 0){
            grid.invaders[Math.floor(Math.random() * grid.invaders.
                length)].shoot(invaderProjectiles)
        }
        grid.invaders.forEach((invader, i) => {
            invader.update({velocity: grid.velocity})

// Projectiles hit enemies
            projectiles.forEach((projectile, j) => {
                if(projectile.position.y - projectile.radius <= 
                    invader.position.y + invader.height &&
                    projectile.position.x + projectile.radius >= 
                    invader.position.x && projectile.position.x -
                    projectile.radius <= invader.position.x + invader.width &&
                    projectile.position.y + projectile.radius >= 
                    invader.position.y){

                        setTimeout(() => {
                            const invaderFound = grid.invaders.find(invader2 =>
                            invader2 === invader
                            )
                            const projectileFound = projectiles.find(
                                projectile2 => projectile2 === projectile)

// Took into account new grid width - Remove invader and projectile
                            if(invaderFound && projectileFound){
                                score += 100
                                scoreElement.innerHTML = score
                            createParticles({
                                object: invader,
                                fades: true
                            })

                            grid.invaders.splice(i, 1)
                            projectiles.splice(j, 1)

                            if (grid.invaders.length > 0) {
                                const firstInvader = grid.invaders[0]
                                const lastInvader = grid.invaders[grid.
                                    invaders.length -1]
                                grid.width = 
                                lastInvader.position.x -
                                firstInvader.position.x + 
                                lastInvader.width
                                grid.position.x = firstInvader.position.x
                            } else {
                                grids.splice(gridIndex, 1)
                            }
                            }
                        }, 0)
                    }
            })
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

    console.log(frames)

    // spawning enemies
if (frames % randomInterval === 0){
    grids.push(new Grid())
    randomInterval = Math.floor(Math.random() * 500 + 500)
    frames = 0
    console.log(randomInterval)
}

frames++
}

animate()

addEventListener('keydown', ({ key }) => {
    if (game.over) return
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