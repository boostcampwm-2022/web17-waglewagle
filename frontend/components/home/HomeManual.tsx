import { useEffect, useRef } from 'react';
import classnames from 'classnames/bind';
import styles from '@sass/components/home/HomeIntroduce.module.scss';
const cx = classnames.bind(styles);

const HomeManual = () => {
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
            console.log('와글와글 사용법');
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
      <h3>와글와글 사용법</h3>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. In tenetur
        tempore, nulla numquam molestiae quae accusantium reiciendis, illum
        doloribus deserunt magnam animi sapiente adipisci temporibus, minus
        odit. Culpa, nostrum repellendus.
      </p>
    </section>
  );
};

export default HomeManual;
