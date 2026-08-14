const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const gravity = 0.5

class Player {
    constructor(){
        this.position = {
            x: 100,
            y: 100
        }

        this.velocity = {
            x: 0,
            y: 1
        }

        this.width = 30
        this.height = 30

        this.canJump = false
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }

    update(){
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height < canvas.height) {
            this.velocity.y += gravity
            this.canJump = false
        }

        else {
            this.position.y = canvas.height - this.height
            this.velocity.y = 0
            this.canJump = true

            if (keys.up.pressed) {
                this.velocity.y = -20
                this.canJump = false
            }
        }
    }
}

const player = new Player()

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    up: {
        pressed: false
    }
}

function animate() {
    requestAnimationFrame(animate)

    c.clearRect(0, 0, canvas.width, canvas.height)

    player.update()

    if (keys.right.pressed) {
        player.velocity.x = 10
    } 
    else if (keys.left.pressed) {
        player.velocity.x = -10
    } 
    else {
        player.velocity.x = 0
    }
}

animate()

addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {

        case 65:
            keys.left.pressed = true
            break

        case 83:
            break

        case 68:
            keys.right.pressed = true
            break

        case 87:
            keys.up.pressed = true
            break
    }
})

addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {

        case 65:
            keys.left.pressed = false
            break

        case 83:
            break

        case 68:
            keys.right.pressed = false
            break

        case 87:
            keys.up.pressed = false
            break
    }
})