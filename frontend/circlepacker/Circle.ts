interface Vector {
  x: number;
  y: number;
}

const FRICTION = 2;

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

  // TODO: 비트 연산 써보기
  reduceVelocity() {
    this.velocity.x /= FRICTION;
    this.velocity.y /= FRICTION;
  }

  updatePosition() {
    if (!this.isMoving) {
      this.velocity.x = 0;
      this.velocity.y = 0;
      return;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.reduceVelocity();
  }

  get isMoving() {
    // velocity가 높아지면 잔움직임이 적어진다.
    if (Math.abs(this.velocity.x) > 0.1 && Math.abs(this.velocity.y) > 0.1) {
      return true;
    }

    return false;
  }
}

export default Circle;
