interface Vector {
  x: number;
  y: number;
}

class Circle {
  constructor(
    public x: number,
    public y: number,
    public radius: number,
    public vector: Vector,
  ) {}
}

export default Circle;
