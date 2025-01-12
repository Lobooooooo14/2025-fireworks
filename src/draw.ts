import type Canvas from "./canvas"

export type DrawSize = {
  width: number
  height: number
}

export type DrawPos = {
  x: number
  y: number
}

export default class Draw {
  private ctx: CanvasRenderingContext2D

  constructor(private canvas: Canvas) {
    this.ctx = canvas.getCtx()
  }

  public rect(
    size: DrawSize,
    pos: DrawPos,
    color: CanvasRenderingContext2D["fillStyle"]
  ) {
    this.ctx.fillStyle = color
    this.ctx.fillRect(pos.x, pos.y, size.width, size.height)
  }

  public circle(
    pos: DrawPos,
    radius: number,
    color: CanvasRenderingContext2D["fillStyle"]
  ) {
    this.ctx.fillStyle = color

    this.ctx.beginPath()
    this.ctx.arc(pos.x + radius, pos.y + radius, radius, 0, Math.PI * 2)
    this.ctx.closePath()
    this.ctx.fill()
  }

  public text(
    text: string,
    pos: DrawPos,
    color: CanvasRenderingContext2D["fillStyle"],
    size: number,
    font: string
  ) {
    this.ctx.fillStyle = color
    this.ctx.textAlign = "center"
    this.ctx.font = `${size}pt ${font}`

    this.ctx.fillText(text, pos.x, pos.y + size / 2)
  }
}
