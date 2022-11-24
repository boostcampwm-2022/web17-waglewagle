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
    const newCircle = new Circle(circleId, x, y, radius, { x: 100, y: 100 });
    this.circles.push(newCircle);

    return newCircle;
  }

  // 화면 갱신
  update() {
    let isAllCircleStop = true;

    this.circles.forEach((circle) => {
      if (circle.isMoving) {
        isAllCircleStop = false;
      }
      circle.move();
    });

    if (isAllCircleStop) {
      this.isStatic = true;
    } else {
      this.isStatic = false;
    }
  }

  // // 겹침 발생시 속도를 변화시킴
  // handleCollision() {}

  // // 겹침 확인
  // checkIntersection() {}
}

export default CircleContainer;
