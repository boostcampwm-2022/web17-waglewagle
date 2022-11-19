import { useEffect, useRef } from 'react';
import classnames from 'classnames/bind';
import styles from '@sass/components/home/HomeIntroduce.module.scss';
const cx = classnames.bind(styles);

const HomeProblem = () => {
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
            console.log('우리가 느낀 문제점');
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
      <h3>우리가 느낀 문제점</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas
        necessitatibus soluta voluptates unde voluptate! Quibusdam laboriosam
        corrupti eum at autem magni deleniti, amet vero debitis voluptatum
        itaque eligendi fugit vel?
      </p>
    </section>
  );
};

export default HomeProblem;
