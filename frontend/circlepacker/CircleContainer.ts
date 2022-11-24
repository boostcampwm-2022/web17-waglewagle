import Circle from './Circle';

class CircleContainer {
  public circles: Circle[];

  constructor(private width: number, private height: number) {
    this.circles = [];
  }

  calcInitVector(x: number, y: number) {
    const centralX = this.width / 2;
    const centralY = this.height / 2;
    const vector = {
      x: 0,
      y: 0,
    };

    if (x > centralX) {
      vector.x = centralX - x;
    }
    if (x < centralX) {
      vector.x = x - centralX;
    }
    if (y > centralY) {
      vector.y = centralY - y;
    }
    if (y < centralY) {
      vector.y = y - centralY;
    }

    return vector;
  }

  getRandPos() {
    return {
      x: Math.floor(Math.random() * this.width),
      y: Math.floor(Math.random() * this.height),
    };
  }

  addCircle(circleId: string, radius: number) {
    const { x, y } = this.getRandPos();
    const newCircle = new Circle(
      circleId,
      x,
      y,
      radius,
      this.calcInitVector(x, y),
    );
    this.circles.push(newCircle);

    return newCircle;
  }

  // // 화면 갱신
  // update() {}

  // // 겹침 발생시 속도를 변화시킴
  // handleCollision() {}

  // // 겹침 확인
  // checkIntersection() {}
}

export default CircleContainer;
