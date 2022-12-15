import Circle from './Circle';
import CircleContainer from './CircleContainer';

type Coordinates = {
  x: number;
  y: number;
};

const calcSlope = (point1: Coordinates, point2: Coordinates) =>
  (point2.y - point1.y) / (point2.x - point1.x);

const calcDistance = (point1: Coordinates, point2: Coordinates) =>
  Math.hypot(point1.x - point2.x, point1.y - point2.y);

describe('CircleContainer', () => {
  let circleContainer: CircleContainer;
  const containerWidth = 1000;
  const containerHeight = 1000;

  beforeEach(() => {
    circleContainer = new CircleContainer(containerWidth, containerHeight);
  });

  it('초기화', () => {
    expect(circleContainer.circles).toEqual({});
  });

  it('하나의 원을 생성한다.', () => {
    circleContainer.addCircle('1', 1);
    expect(Object.keys(circleContainer.circles)).toHaveLength(1);
    expect(circleContainer.circles['1']).toMatchObject({ id: '1' });
  });

  it('생성된 원은 중심 방향의 속도를 가진다.', () => {
    circleContainer.addCircle('1', 1);
    const initialCircle = { ...circleContainer.circles['1'] };
    const centerPosition = { x: containerWidth / 2, y: containerHeight / 2 };
    expect(calcSlope(initialCircle, centerPosition)).toBeCloseTo(
      initialCircle.velocity.y / initialCircle.velocity.x,
    );
  });

  it('원은 속도의 방향으로 움직인다.', () => {
    circleContainer.addCircle('1', 1);
    const initialCircle = { ...circleContainer.circles['1'] };
    circleContainer.update();
    const movedCircle = { ...circleContainer.circles['1'] };
    expect(calcSlope(initialCircle, movedCircle)).toBeCloseTo(
      initialCircle.velocity.y / initialCircle.velocity.x,
    );
  });

  it('겹치는 원이 있다면 handleIntersection 메소드가 호출된다.', () => {
    const handleIntersection = jest.fn();
    circleContainer.handleIntersection = handleIntersection;
    circleContainer.circles = {
      1: new Circle('1', 0, 0, 10, { x: 0, y: 0 }),
      2: new Circle('2', 1, 1, 10, { x: 0, y: 0 }),
    };
    circleContainer.update();
    expect(handleIntersection).toHaveBeenCalledTimes(1);
  });

  it('충돌이 발생한 두 원은 거리가 멀어진다.', () => {
    circleContainer.circles = {
      1: new Circle('1', 500, 500, 10, { x: 0, y: 0 }),
      2: new Circle('2', 501, 501, 10, { x: 0, y: 0 }),
    };
    const initialDistance = calcDistance(
      circleContainer.circles['1'],
      circleContainer.circles['2'],
    );
    circleContainer.update();
    const updatedDistance = calcDistance(
      circleContainer.circles['1'],
      circleContainer.circles['2'],
    );
    expect(updatedDistance).toBeGreaterThan(initialDistance);
  });
});
