import Circle from './Circle';

const INTERSECTION_REPULSIVE_COEFFICIENT = 1;
const REPULSIVE_COEFFICIENT = 0.6;
const COLLISION_COEFFICIENT = 0.1;

enum INTERSECTION_TYPES {
  INTERSECTION = 'intersection',
  COLLISION = 'collision',
  NO_COLLISION = 'no collision',
}

class CircleContainer {
  public circles: Record<string, Circle> = {};

  constructor(
    private width: number,
    private height: number,
    private gravityCoefficient: number = 98,
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

  getRandPosByMass(mass: number) {
    const centralX = this.width / 2;
    const centralY = this.height / 2;
    const massCoefficient = mass > 50 ? 25 / mass : 1; // 무거우면 범위를 줄인다.

    return {
      x:
        Math.floor(
          centralX + (Math.random() * this.width - centralX) * massCoefficient,
        ) *
          0.9 +
        50,
      y:
        Math.floor(
          centralY + (Math.random() * this.height - centralY) * massCoefficient,
        ) *
          0.9 +
        50,
    };
  }

  addCircle(circleId: string, radius: number) {
    if (circleId in this.circles) {
      const updatedCircle = this.circles[circleId];
      if (!updatedCircle) {
        throw new Error('없는 원입니다.');
      }
      updatedCircle.radius = radius;
      return updatedCircle;
    }

    const { x, y } = this.getRandPosByMass(radius);
    const newCircle = new Circle(
      circleId,
      x,
      y,
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
        const intersectionType = this.checkIntersection(circleA, circleB);
        if (intersectionType !== INTERSECTION_TYPES.NO_COLLISION) {
          this.handleIntersection(circleA, circleB, intersectionType);
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

  // 충돌 확인
  // 한 번에 계산하고자 충돌과 겹칩을 같이 확인함.
  checkIntersection(circleA: Circle, circleB: Circle) {
    const distance = Math.hypot(circleA.x - circleB.x, circleA.y - circleB.y);

    if (circleA.radius + circleB.radius * 0.9 > distance) {
      return INTERSECTION_TYPES.INTERSECTION;
    }

    if ((circleA.radius + circleB.radius) * 1.03 >= distance) {
      return INTERSECTION_TYPES.COLLISION;
    }

    return INTERSECTION_TYPES.NO_COLLISION;
  }

  // 스칼라를 계산해서 Vector를 구혀준다.
  calculateIntersectionScala(
    speedA: number,
    speedB: number,
    massA: number,
    massB: number,
    repulsiveForce: number,
    intersectionType: INTERSECTION_TYPES,
  ) {
    const baseForce =
      speedA + (2 * massB * (speedB - speedA)) / (massA + massB);

    switch (intersectionType) {
      case INTERSECTION_TYPES.INTERSECTION:
        return (
          (baseForce + repulsiveForce * INTERSECTION_REPULSIVE_COEFFICIENT) *
          COLLISION_COEFFICIENT
        );

      case INTERSECTION_TYPES.COLLISION:
        return (
          (baseForce + repulsiveForce * REPULSIVE_COEFFICIENT) *
          COLLISION_COEFFICIENT
        );

      default:
        return (
          (baseForce + repulsiveForce * REPULSIVE_COEFFICIENT) *
          COLLISION_COEFFICIENT
        );
    }
  }

  calculateIntersectionVector(
    circleA: Circle,
    circleB: Circle,
    intersectionType: INTERSECTION_TYPES,
  ) {
    const distanceX = circleA.x - circleB.x;
    const distanceY = circleA.y - circleB.y;

    const afterCircleAVelocity = {
      x: this.calculateIntersectionScala(
        circleA.velocity.x,
        circleB.velocity.x,
        circleA.radius,
        circleB.radius,
        distanceX,
        intersectionType,
      ),
      y: this.calculateIntersectionScala(
        circleA.velocity.y,
        circleB.velocity.y,
        circleA.radius,
        circleB.radius,
        distanceY,
        intersectionType,
      ),
    };
    const afterCircleBVelocity = {
      x: this.calculateIntersectionScala(
        circleB.velocity.x,
        circleA.velocity.x,
        circleB.radius,
        circleA.radius,
        -distanceX,
        intersectionType,
      ),
      y: this.calculateIntersectionScala(
        circleB.velocity.y,
        circleA.velocity.y,
        circleB.radius,
        circleA.radius,
        -distanceY,
        intersectionType,
      ),
    };
    return { afterCircleAVelocity, afterCircleBVelocity };
  }

  // // 겹침 발생시 속도를 변화시킴
  handleIntersection(
    circleA: Circle,
    circleB: Circle,
    intersectionType: INTERSECTION_TYPES,
  ) {
    const { afterCircleAVelocity, afterCircleBVelocity } =
      this.calculateIntersectionVector(circleA, circleB, intersectionType);

    circleA.velocity = afterCircleAVelocity;
    circleB.velocity = afterCircleBVelocity;
  }

  applyGravity(circle: Circle) {
    const centralX = this.width / 2;
    const centralY = this.height / 2;
    const gravityX = centralX - circle.x;
    const gravityY = centralY - circle.y;
    circle.x += gravityX / this.gravityCoefficient;
    circle.y += gravityY / this.gravityCoefficient;
  }

  resize(newWidth: number, newHeight: number) {
    this.gravityCoefficient = Infinity;
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
    this.gravityCoefficient = 98;
  }
}

export default CircleContainer;
