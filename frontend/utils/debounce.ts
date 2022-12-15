// debounce callback의 ...arg는 타입 지정, return 내부의 ...arg에서 callback의 인자를 주고 있다.
const debounce = <TArgs extends unknown[]>(
  callback: (...arg: TArgs) => unknown,
  delay: number,
) => {
  let timer: NodeJS.Timeout;
  return (...arg: TArgs) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...arg), delay);
  };
};

export default debounce;
