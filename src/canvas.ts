export default class Canvas {
  private canvas!: HTMLCanvasElement
  private ctx!: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D
  }

  getCanvas() {
    return this.canvas
  }

  getCtx() {
    return this.ctx
  }

  getSize() {
    return {
      width: this.canvas.width,
      height: this.canvas.height,
    }
  }

  setSize(size: { width: number; height: number }) {
    this.canvas.width = size.width
    this.canvas.height = size.height
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}
