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
  const CONTAINER_MOCK_WIDTH = 1000; // window.innerWidth를 Mocking 함.
  const CONTAINER_MOCK_HEIGHT = 1000; // window.innerHeight을 Mocking 함.

  beforeEach(() => {
    circleContainer = new CircleContainer(
      CONTAINER_MOCK_WIDTH,
      CONTAINER_MOCK_HEIGHT,
    );
  });

  it('CircleContainer 초기화 테스트', () => {
    expect(circleContainer.circles).toEqual({});
    expect(circleContainer['width']).toEqual(CONTAINER_MOCK_WIDTH);
    expect(circleContainer['height']).toEqual(CONTAINER_MOCK_HEIGHT);
  });

  it('하나의 원을 생성한다.', () => {
    circleContainer.addCircle('1', 1);
    expect(Object.keys(circleContainer.circles)).toHaveLength(1);
    expect(circleContainer.circles['1']).toMatchObject({ id: '1' });
  });

  it('이미 있는 원 일 경우, 추가가 아닌 갱신', () => {
    circleContainer.addCircle('1', 1);
    const initialCircle = { ...circleContainer.circles['1'] };

    circleContainer.addCircle('1', 2);
    const updatedCircle = { ...circleContainer.circles['1'] };

    expect(Object.keys(circleContainer.circles)).toHaveLength(1);
    expect(updatedCircle.radius === initialCircle.radius).toBeFalsy();
  });

  it('생성된 원은 중심 방향의 속도를 가진다.', () => {
    circleContainer.addCircle('1', 1);
    const initialCircle = { ...circleContainer.circles['1'] };
    const centerPosition = {
      x: CONTAINER_MOCK_WIDTH / 2,
      y: CONTAINER_MOCK_HEIGHT / 2,
    };
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

  it('두 원이 겹친 경우 handleIntersection 메소드만 호출된다.', () => {
    const handleIntersection = jest.fn();
    const handleCollision = jest.fn();
    circleContainer['handleIntersection'] = handleIntersection;
    circleContainer['handleCollision'] = handleCollision;
    circleContainer.addCircle('1', 10, { x: 501, y: 501 });
    circleContainer.addCircle('2', 10, { x: 500, y: 500 });
    circleContainer.update();
    expect(handleIntersection).toHaveBeenCalledTimes(1);
    expect(handleCollision).toHaveBeenCalledTimes(0);
  });

  it('두 원이 충돌한 경우 handleCollision 메소드만 호출된다.', () => {
    const handleIntersection = jest.fn();
    const handleCollision = jest.fn();
    circleContainer['handleIntersection'] = handleIntersection;
    circleContainer['handleCollision'] = handleCollision;
    circleContainer.addCircle('1', 10, { x: 530, y: 500 });
    circleContainer.addCircle('2', 10, { x: 500, y: 500 });
    circleContainer.update();
    expect(handleIntersection).toHaveBeenCalledTimes(0);
    expect(handleCollision).toHaveBeenCalledTimes(1);
  });

  it('두 원이 거리가 먼 경우 handleIntersection, handleCollision 메소드 둘 다 호출되지 않는다.', () => {
    const handleIntersection = jest.fn();
    const handleCollision = jest.fn();
    circleContainer['handleIntersection'] = handleIntersection;
    circleContainer['handleCollision'] = handleCollision;
    circleContainer.addCircle('1', 10, { x: 100, y: 100 });
    circleContainer.addCircle('2', 10, { x: 300, y: 300 });
    circleContainer.update();
    expect(handleIntersection).toHaveBeenCalledTimes(0);
    expect(handleCollision).toHaveBeenCalledTimes(0);
  });

  it('겹침이 발생한 두 원은 거리가 멀어진다.', () => {
    circleContainer.addCircle('1', 10, { x: 501, y: 501 });
    circleContainer.addCircle('2', 10, { x: 500, y: 500 });
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

  it('충돌이 발생한 두 원은 거리가 멀어진다.', () => {
    circleContainer.addCircle('1', 10, { x: 530, y: 500 });
    circleContainer.addCircle('2', 10, { x: 500, y: 500 });
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

  it('겹침이 발생했을 때, 충돌이 발생한 경우보다 더 멀어진다.', () => {
    circleContainer.addCircle('1', 10, { x: 330, y: 300 });
    circleContainer.addCircle('2', 10, { x: 300, y: 300 });
    const initialDistanceCollision = calcDistance(
      circleContainer.circles['1'],
      circleContainer.circles['2'],
    );
    circleContainer.update();
    const updatedDistanceCollision = calcDistance(
      circleContainer.circles['1'],
      circleContainer.circles['2'],
    );
    const collisionDelta = updatedDistanceCollision - initialDistanceCollision;

    circleContainer.addCircle('3', 10, { x: 501, y: 500 });
    circleContainer.addCircle('4', 10, { x: 500, y: 500 });
    const initialDistanceIntersection = calcDistance(
      circleContainer.circles['3'],
      circleContainer.circles['4'],
    );
    circleContainer.update();
    const updatedDistanceIntersection = calcDistance(
      circleContainer.circles['3'],
      circleContainer.circles['4'],
    );
    const intersectionDelta =
      updatedDistanceIntersection - initialDistanceIntersection;

    expect(intersectionDelta).toBeGreaterThan(collisionDelta);
  });
});
