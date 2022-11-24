import Circle from './Circle';

class CircleContainer {
  public circles: Circle[] = [];
  public isStatic = false; // '나를 조금만 더 믿어줘 에러' 타입스크립트가 너무 추론이 쉬운건 타입 쓰지 말라는 에러가 뜸. 찾아보니 진짜라서 지움.

  constructor(private width: number, private height: number) {}

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
      vector.x = centralX - x;
    }
    if (y > centralY) {
      vector.y = centralY - y;
    }
    if (y < centralY) {
      vector.y = centralY - y;
    }

    vector.x /= 4;
    vector.y /= 4;

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

  // 화면 갱신
  update() {
    let isAllCircleStop = true;

    for (let i = 0; i < this.circles.length - 1; i++) {
      const circleA = this.circles[i];
      if (circleA.isMoving) {
        isAllCircleStop = false;
        for (let j = i + 1; j < this.circles.length; j++) {
          const circleB = this.circles[j];
          if (this.checkIntersection(circleA, circleB)) {
            console.log('충돌!!!!');
          }
        }
      }
      circleA.move();
    }

    if (isAllCircleStop) {
      this.isStatic = true;
    } else {
      this.isStatic = false;
    }
  }

  // 겹침 확인
  checkIntersection(circleA: Circle, circleB: Circle) {
    const distance = Math.hypot(circleA.x - circleB.x, circleA.y - circleB.y);
    if (circleA.radius + circleB.radius > distance) {
      return true;
    }

    return false;
  }

  // // 겹침 발생시 속도를 변화시킴
  // handleCollision() {}
}

export default CircleContainer;
