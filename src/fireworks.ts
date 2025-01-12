import type Game from "./game.js"
import { type ColorRGB, randomColorRGB } from "./utils.js"

interface IPosition {
  x: number
  y: number
}

interface ITrail {
  pos: IPosition
  size: number
  opacity: number
  life: number
  color: ColorRGB
}

interface IFirework {
  pos: IPosition
  size: number
  color: ColorRGB
  speed: number
  life: number
  trail: ITrail[]
  mode: "explosion" | "firework"
  velocity?: IPosition
}

const gravity = 0.1

export default class Fireworks {
  public game!: Game
  public fireworks: IFirework[] = []

  constructor(game: Game) {
    this.game = game
  }

  public update() {
    for (const firework of this.fireworks) {
      firework.trail.forEach((trail, index) => {
        if (!(trail.size < 0.01)) {
          this.game.draw.circle(
            trail.pos,
            trail.size,
            `rgba(
              ${trail.color.r},
              ${trail.color.g},
              ${trail.color.b},
              ${trail.opacity.toFixed(2)}
            )`
          )
        }

        trail.opacity -= 0.03

        trail.pos.y += Math.random() * 5
        trail.pos.x += (Math.random() - 0.5) * 5

        if (trail.pos.y > this.game.canvas.getSize().height) {
          firework.trail.splice(index, 1)
        }
      })

      firework.trail = firework.trail.filter(trail => trail.opacity > 0)

      if (firework.life > 0) {
        firework.trail.push({
          pos: { ...firework.pos, x: firework.pos.x },
          size: firework.size,
          opacity: 1,
          color: firework.color,
          life: 1,
        })
      }

      if (firework.trail.length < 1) {
        this.fireworks.splice(this.fireworks.indexOf(firework), 1)
        continue
      }

      if (firework.trail[0].pos.x < 0) this.resetFirework(firework)
      if (firework.trail[0].pos.x > this.game.canvas.getSize().width)
        this.resetFirework(firework)

      if (firework.trail[0].pos.y < 0) this.resetFirework(firework)

      if (firework.life < 0 && firework.mode === "firework") {
        this.spawExplosion(firework)
        this.resetFirework(firework)
      }

      if (firework.mode === "firework") {
        firework.pos.y -= firework.speed
      }

      if (firework.mode === "explosion") {
        if (firework.velocity) {
          firework.pos.x += firework.velocity.x
          firework.pos.y += firework.velocity.y
          firework.velocity.y += gravity
        }
      }

      firework.pos.x -= (Math.random() - 0.5) * 8

      firework.life -= 0.03
      firework.size -= 0.03
    }
  }

  private spawExplosion(firework: IFirework) {
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = firework.speed * (Math.random() * 1.2)

      this.fireworks.push({
        pos: { ...firework.pos },
        speed,
        size: firework.size * 0.5,
        color: firework.color,
        trail: [],
        life: 5,
        mode: "explosion",
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed,
        },
      })
    }
  }

  private resetFirework(firework: IFirework) {
    if (firework.mode === "explosion") return

    const power = (Math.random() + 0.5) * 10

    firework.size = power
    firework.speed = power
    firework.color = randomColorRGB()
    firework.pos.x = Math.random() * this.game.canvas.getSize().width
    firework.pos.y = this.game.canvas.getSize().height + 50
    firework.life = 1
    firework.mode = "firework"
  }

  private spawnFirework() {
    const power = (Math.random() + 0.5) * 10

    this.fireworks.push({
      pos: {
        x: Math.random() * this.game.canvas.getSize().width,
        y: this.game.canvas.getSize().height + 50,
      },
      speed: power,
      size: power,
      color: randomColorRGB(),
      trail: [],
      life: 1,
      mode: "firework",
    })
  }

  public setup() {
    this.spawnFirework()
  }
}
