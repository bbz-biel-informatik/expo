const WIDTH = 1000
const HEIGHT = 600
const WIDTH_CENTER = WIDTH/2

class Enemy {

    constructor(direction, speed, size) {
        this.direction = direction
        this.speed = speed
        this.size = size
        this.x, this.y = 0
        this.vel_x, this.vel_y = 0
        this.angle = 5

        switch(direction) {
            // Top
            case 0:
                this.x = this.randomNumber(0, WIDTH)
                this.y = 0
                this.vel_x = this.randomNumber(-this.angle, this.angle)
                this.vel_y = speed
                break
            // Right
            case 1:
                this.x = WIDTH
                this.y = this.randomNumber(0, HEIGHT)
                this.vel_x = -speed
                this.vel_y = this.randomNumber(-this.angle, this.angle)
                break
            // Bottom
            case 2:
                this.x = this.randomNumber(0, WIDTH)
                this.y = 0
                this.vel_x = this.randomNumber(-this.angle, this.angle)
                this.vel_y = -speed
                break
            // Left
            case 3:
                this.x = 0
                this.y = this.randomNumber(0 , HEIGHT)
                this.vel_x = speed
                this.vel_y = this.randomNumber(-this.angle, this.angle)
                break
        }

        this.dom = document.createElement('div')
        this.dom.classList.add('stein')
        this.dom.style.width = this.size + 'px'
        this.dom.style.height = this.size + 'px'
    }

    isOutOfBounds() {
        if (this.x <= 0 || this.x >= WIDTH) {
            return true
        }
        if(this.y <= 0 || this.y >= HEIGHT) {
            return true
        }
        return false
    }

    get render() {
        return this.dom
    }

    move() {
        this.x += this.vel_x
        this.y += this.vel_y
        this.dom.style.left = this.x.toString() + 'px'
        this.dom.style.top = this.y.toString() + 'px'
    }

    randomNumber(min, max) {  
        return Math.floor(Math.random() * (max - min) + min); 
    }  
}