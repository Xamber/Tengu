const RIGHT = "right"
const LEFT = "left"
const UP = "up"
const DOWN = "down"
const SINGLE = "single"
const FORCE = "force"

export default class Touch {

    constructor(distance = 30) {
        this.start = {}
        this.end = {}

        this.power = 0

        this.distance = distance
        
        this.on = this.on.bind(this)

        this[RIGHT] = () => { console.log(RIGHT) }
        this[LEFT] = () => { console.log(LEFT) }
        this[UP] = () => { console.log(UP) }
        this[DOWN] = () => { console.log(DOWN) }
        this[SINGLE] = () => { console.log(SINGLE) }
        this[FORCE] = () => { console.log(FORCE) }

        this.configure = (elem) => {
            elem.addEventListener("touchstart", this.handleTouchStart, false);
            elem.addEventListener("touchend", this.handleTouchEnd, false);
            elem.addEventListener('touchforcechange', this.handleTouchForceChange, false)
        }

        this.handleTouchStart = (evt) => {
            this.start = evt.changedTouches[0]
        }

        this.handleTouchForceChange = (evt) => {
            this.power = evt.changedTouches[0].force
            this[FORCE](this.power)
        } 

        this.handleTouchEnd = (evt) => {
            this.end = evt.changedTouches[0]
            
            let X = this.start.clientX - this.end.clientX
            let Y = this.start.clientY - this.end.clientY

            if (Math.abs(X) < this.distance || Math.abs(X) < Math.abs(Y)) { X = 0 }
            if (Math.abs(Y) < this.distance || Math.abs(Y) < Math.abs(X)) { Y = 0 }
            
            switch (true) {
                case X > 0 && Y < this.distance: this[RIGHT]();break;
                case X < 0 && Y < this.distance: this[LEFT]();break;
                case Y > 0 && X < this.distance: this[DOWN]();break;
                case Y < 0 && X < this.distance: this[UP]();break;
                default: this[SINGLE]()
            }

        }
    }

    on(evt, handler) {
        if (evt === RIGHT || evt === LEFT || evt === UP || evt === DOWN || evt === SINGLE || evt === FORCE) {
            this[evt] = handler
        }
    }
}