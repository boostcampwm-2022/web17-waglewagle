import { useEffect, useRef } from 'react';
import classnames from 'classnames/bind';
import styles from '@sass/components/home/HomeIntroduce.module.scss';
const cx = classnames.bind(styles);

const HomeIntroduce = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (sectionRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(cx('active'));
            } else {
              entry.target.classList.remove(cx('active'));
            }
          });
        },
        {
          threshold: 0.1,
        },
      );
      observer.observe(sectionRef.current);
    }
  }, []);
  return (
    <section ref={sectionRef}>
      <h3>와글와글 소개</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quod
        consequuntur quidem molestias totam reiciendis iste at repellat. Cum
        esse quae fugit in possimus ipsam molestiae impedit recusandae accusamus
        nisi.
      </p>
    </section>
  );
};

export default HomeIntroduce;
