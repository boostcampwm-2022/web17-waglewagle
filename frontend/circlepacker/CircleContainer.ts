import Circle from './Circle';

const REPULSIVE_COEFFICIENT = 0.07;

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

    vector.x /= 20;
    vector.y /= 20;

    return vector;
  }

  getRandPos() {
    return {
      x: Math.floor(Math.random() * this.width) * 0.8 + 50,
      y: Math.floor(Math.random() * this.height) * 0.8 + 50,
    };
  }

  addCircle(circleId: string, radius: number, innerText: string) {
    const { x, y } = this.getRandPos();
    const newCircle = new Circle(
      circleId,
      x,
      y,
      innerText,
      radius,
      this.calcInitVector(x, y),
    );
    this.circles.push(newCircle);

    return newCircle;
  }

  // 화면 갱신
  update() {
    let isAllCircleStop = true;

    for (let i = 0; i < this.circles.length; i++) {
      const circleA = this.circles[i];
      if (circleA.isMoving) {
        isAllCircleStop = false;
        for (let j = i + 1; j < this.circles.length; j++) {
          const circleB = this.circles[j];
          if (this.checkIntersection(circleA, circleB)) {
            this.handleCollision(circleA, circleB);
          }
        }
      }
      this.handleWallCollision(circleA);
      circleA.move();
    }

    if (isAllCircleStop) {
      this.isStatic = true;
    } else {
      this.isStatic = false;
    }
  }

  handleWallCollision(circle: Circle) {
    if (
      circle.x - circle.radius <= 0 ||
      circle.x + circle.radius >= this.width
    ) {
      circle.velocity.x *= -1;
    }

    if (
      circle.y - circle.radius <= 0 ||
      circle.y + circle.radius >= this.height
    ) {
      circle.velocity.y *= -1;
    }
  }

  // 겹침 확인
  checkIntersection(circleA: Circle, circleB: Circle) {
    const distance = Math.hypot(circleA.x - circleB.x, circleA.y - circleB.y);
    if ((circleA.radius + circleB.radius) * 1.01 >= distance) {
      return true;
    }

    return false;
  }

  // 스칼라를 계산해서 Vector를 구혀준다.
  caculateCollisionScala(
    speedA: number,
    speedB: number,
    massA: number,
    massB: number,
    repulsiveForce: number,
  ) {
    return (
      speedA +
      (2 * massB * (speedB - speedA)) / (massA + massB) +
      repulsiveForce * REPULSIVE_COEFFICIENT
    );
  }

  caculateCollisionVector(circleA: Circle, circleB: Circle) {
    const distanceX = circleA.x - circleB.x;
    const distanceY = circleA.y - circleB.y;
    const afterCircleAVelocity = {
      x: this.caculateCollisionScala(
        circleA.velocity.x,
        circleB.velocity.x,
        circleA.radius,
        circleB.radius,
        distanceX,
      ),
      y: this.caculateCollisionScala(
        circleA.velocity.y,
        circleB.velocity.y,
        circleA.radius,
        circleB.radius,
        distanceY,
      ),
    };
    const afterCircleBVelocity = {
      x: this.caculateCollisionScala(
        circleB.velocity.x,
        circleA.velocity.x,
        circleB.radius,
        circleA.radius,
        -distanceX,
      ),
      y: this.caculateCollisionScala(
        circleB.velocity.y,
        circleA.velocity.y,
        circleB.radius,
        circleA.radius,
        -distanceY,
      ),
    };
    return { afterCircleAVelocity, afterCircleBVelocity };
  }

  // // 겹침 발생시 속도를 변화시킴
  handleCollision(circleA: Circle, circleB: Circle) {
    const { afterCircleAVelocity, afterCircleBVelocity } =
      this.caculateCollisionVector(circleA, circleB);
    circleA.velocity = afterCircleAVelocity;
    circleB.velocity = afterCircleBVelocity;
  }
}

export default CircleContainer;
