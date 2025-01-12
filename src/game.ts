import Canvas from "./canvas.js"
import Draw from "./draw.js"
import Fireworks from "./fireworks.js"
import Stars from "./stars.js"

export default class Game {
  public canvas!: Canvas
  public draw!: Draw
  public stars!: Stars
  public fireworks!: Fireworks
  public frame: number = 0

  private update() {
    this.canvas.setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    this.canvas.clear()

    const canvasSize = this.canvas.getSize()

    this.draw.rect(
      {
        width: canvasSize.width,
        height: canvasSize.height,
      },
      {
        x: 0,
        y: 0,
      },
      "black"
    )

    this.draw.text(
      "2025",
      { x: canvasSize.width / 2, y: canvasSize.height / 2 },
      "rgba(255, 255, 225, 0.1)",
      120,
      "Arial Black"
    )

    this.stars.update()
    this.fireworks.update()

    this.frame = requestAnimationFrame(this.update.bind(this))
  }

  public setup() {
    const canvasElement = document.getElementById("canvas") as
      | HTMLCanvasElement
      | undefined

    if (!canvasElement) return

    this.canvas = new Canvas(canvasElement)

    this.canvas.setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    this.draw = new Draw(this.canvas)
    this.stars = new Stars(this)
    this.fireworks = new Fireworks(this)

    this.stars.setup()
    this.fireworks.setup()

    this.update()
  }
}
