// git add -A 
// git commit -m "Hello World"
// git push

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

            if (keys.left.pressed && keys.right.pressed) {
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
    }
}

function animate() {
    requestAnimationFrame(animate)

    c.clearRect(0, 0, canvas.width, canvas.height)

    player.update()

    if (keys.right.pressed && !keys.left.pressed) {
        player.velocity.x = 10
    } 
    else if (keys.left.pressed && !keys.right.pressed) {
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

        case 68:
            keys.right.pressed = true
            break

        case 87:
            if (player.canJump) {
                player.velocity.y = -20
                player.canJump = false
            }
            break
    }
})

addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {

        case 65:
            keys.left.pressed = false
            break

        case 68:
            keys.right.pressed = false
            break
    }
})

const leftButton = document.createElement('button')
const upButton = document.createElement('button')
const rightButton = document.createElement('button')

leftButton.innerText = '<-'
upButton.innerText = '/\\'
rightButton.innerText = '->'

document.body.appendChild(leftButton)
document.body.appendChild(upButton)
document.body.appendChild(rightButton)

leftButton.style.position = 'fixed'
leftButton.style.left = '20px'
leftButton.style.bottom = '20px'

upButton.style.position = 'fixed'
upButton.style.left = '110px'
upButton.style.bottom = '20px'

rightButton.style.position = 'fixed'
rightButton.style.left = '200px'
rightButton.style.bottom = '20px'

const buttons = [leftButton, upButton, rightButton]

buttons.forEach(button => {
    button.style.width = '80px'
    button.style.height = '80px'
    button.style.fontSize = '40px'
    button.style.opacity = '0.7'
    button.style.borderRadius = '15px'
    button.style.border = '2px solid black'
    button.style.touchAction = 'none'
    button.style.userSelect = 'none'
    button.style.webkitUserSelect = 'none'
})

leftButton.addEventListener('pointerdown', (event) => {
    event.preventDefault()
    keys.left.pressed = true
})

leftButton.addEventListener('pointerup', (event) => {
    event.preventDefault()
    keys.left.pressed = false
})

leftButton.addEventListener('pointercancel', () => {
    keys.left.pressed = false
})

leftButton.addEventListener('pointerleave', (event) => {
    if (event.buttons === 0) {
        keys.left.pressed = false
    }
})

rightButton.addEventListener('pointerdown', (event) => {
    event.preventDefault()
    keys.right.pressed = true
})

rightButton.addEventListener('pointerup', (event) => {
    event.preventDefault()
    keys.right.pressed = false
})

rightButton.addEventListener('pointercancel', () => {
    keys.right.pressed = false
})

rightButton.addEventListener('pointerleave', (event) => {
    if (event.buttons === 0) {
        keys.right.pressed = false
    }
})

upButton.addEventListener('pointerdown', (event) => {
    event.preventDefault()

    if (player.canJump) {
        player.velocity.y = -20
        player.canJump = false
    }
})

upButton.addEventListener('pointerup', (event) => {
    event.preventDefault()
})

upButton.addEventListener('pointercancel', () => {})

upButton.addEventListener('pointerleave', (event) => {
    if (event.buttons === 0) {
    }
})