const drawSVG = (svg: SVGSVGElement) => {
  const svgPaths = svg.querySelectorAll('path');
  svgPaths?.forEach((path, index) => {
    const length = path.getTotalLength();
    path.style.setProperty('--length', length.toString()); // 스크롤에 맞춰서 선이 그어질 수 잇도록 각 선의 길이를 css로 보내준다.로 선이 그려질 수 있도록
    path.style.setProperty('--delay', index * 25 + 'ms');
    path.style.setProperty('--duration', length * 12 + 'ms'); // path 길이에 맞는 속도로 그려질 수 있도록
  });
};

export default drawSVG;
