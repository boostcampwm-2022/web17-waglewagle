import Circle from './Circle';

const REPULSIVE_COEFFICIENT = 1;
const COLLISION_COEFFICIENT = 0.1;

class CircleContainer {
  // TODO: circles private으로 수정하기
  public circles: Record<string, Circle> = {};

  constructor(
    private width: number,
    private height: number,
    private gravityCoefficent: number = 98,
  ) {}

  calcInitVector(x: number, y: number) {
    const centralX = this.width / 2;
    const centralY = this.height / 2;
    const vector = {
      x: 0,
      y: 0,
    };

    // 초기 중력
    vector.x = centralX - x;
    vector.y = centralY - y;

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
    if (circleId in this.circles) {
      const updatedCircle = this.circles[circleId];
      if (!updatedCircle) {
        throw new Error('없는 원입니다.');
      }
      updatedCircle.radius = radius;
      return updatedCircle;
    }

    const { x, y } = this.getRandPos();
    const newCircle = new Circle(
      circleId,
      x,
      y,
      innerText,
      (radius * this.width) / 2000 + 10,
      this.calcInitVector(x, y),
    );
    this.circles[circleId] = newCircle;

    return newCircle;
  }

  // 화면 갱신
  update() {
    const idArray = Object.keys(this.circles);
    for (let i = 0; i < idArray.length; i++) {
      const circleA = this.circles[idArray[i]];
      for (let j = i + 1; j < idArray.length; j++) {
        const circleB = this.circles[idArray[j]];
        if (this.checkIntersection(circleA, circleB)) {
          this.handleCollision(circleA, circleB);
        }
      }
      this.applyGravity(circleA);
      this.handleWallCollision(circleA);
      circleA.move();
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
      (speedA +
        (2 * massB * (speedB - speedA)) / (massA + massB) +
        repulsiveForce * REPULSIVE_COEFFICIENT) *
      COLLISION_COEFFICIENT
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

  applyGravity(circle: Circle) {
    const centralX = this.width / 2;
    const centralY = this.height / 2;
    const gravityX = centralX - circle.x;
    const gravityY = centralY - circle.y;
    circle.x += gravityX / this.gravityCoefficent;
    circle.y += gravityY / this.gravityCoefficent;
  }

  resize(newWidth: number, newHeight: number) {
    this.gravityCoefficent = Infinity;
    const widthFactor = newWidth / this.width;
    const heightFactor = newHeight / this.height;

    for (const id in this.circles) {
      const circle = this.circles[id];
      circle.x *= widthFactor;
      circle.y *= heightFactor;
      circle.radius *= widthFactor;
    }
    this.width = newWidth;
    this.height = newHeight;
    this.gravityCoefficent = 98;
  }
}

export default CircleContainer;
