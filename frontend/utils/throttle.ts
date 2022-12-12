// debounce callback의 ...arg는 타입 지정, return 내부의 ...arg에서 callback의 인자를 주고 있다.
const throttle = <TArgs extends unknown[]>(
  callback: (...args: TArgs) => unknown,
  waitingTime: number,
) => {
  let isWaiting = true;
  return (...args: TArgs) => {
    if (isWaiting) {
      callback(...args);
      isWaiting = false;
      setTimeout(() => {
        isWaiting = true;
      }, waitingTime);
    }
  };
};

export default throttle;
