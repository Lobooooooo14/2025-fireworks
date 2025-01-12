import type Game from "./game.js"
import { choice } from "./utils.js"

interface Star {
  size: number
  pos: {
    x: number
    y: number
  }
}

export default class Stars {
  private game!: Game
  private stars: Star[] = []
  private lastCanvasSize!: { width: number; height: number }

  constructor(game: Game) {
    this.game = game
  }

  public update() {
    for (const star of this.stars) {
      this.game.draw.circle(
        {
          x: star.pos.x,
          y: star.pos.y,
        },
        star.size,
        Math.random() > 0.05
          ? "white"
          : choice(["white", "gray", "#fff000", "#ff0000", "#0000FF"])
      )
    }
  }

  private createStar(pos?: { x: number | undefined; y: number | undefined }) {
    const star = {
      size: Math.random() * 1.2,
      pos: {
        x: pos?.x ?? Math.random() * this.game.canvas.getSize().width,
        y: pos?.y ?? Math.random() * this.game.canvas.getSize().height,
      },
    }

    this.stars.push(star)

    return star
  }

  public setup() {
    const canvasSize = this.game.canvas.getSize()

    this.lastCanvasSize = canvasSize

    const amount = (canvasSize.width + canvasSize.height) * 0.4

    for (let i = 0; i < amount; i++) {
      this.createStar()
    }
  }
}
