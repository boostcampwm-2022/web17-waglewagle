import Circle from './Circle';

class CircleManager {
  constructor(public circles: Circle[]) {}

  // 화면 갱신
  update() {}

  // 겹침 발생시 속도를 변화시킴
  handleCollision() {}

  // 겹침 확인
  checkIntersection() {}
}

export default CircleManager;
