interface Vector {
  x: number;
  y: number;
}

const FRICTION = 1.1;

class Circle {
  constructor(
    public id: string,
    public x: number,
    public y: number,
    public radius: number,
    public velocity: Vector,
  ) {}

  move() {
    this.updatePosition();
    return {
      x: this.x,
      y: this.y,
    };
  }

  reduceVelocity() {
    this.velocity.x /= FRICTION;
    this.velocity.y /= FRICTION;
  }

  updatePosition() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.reduceVelocity();
  }
}

export default Circle;
