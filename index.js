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

        // this.image =
        this.width = 100
        this.height = 100
    }
}