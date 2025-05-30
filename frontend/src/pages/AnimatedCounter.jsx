import { useEffect, useRef, useState } from "react";

const AnimatedCounter = ({ start = 0, end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(start);
  const counterRef = useRef(null);
  const hasAnimated = useRef(false); // prevents rerun

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const endValue =
            typeof end === "number"
              ? end
              : parseInt(end.toString().replace(/[^\d]/g, ""));
          const startTime = Date.now();

          const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (endValue - start) * progress);

            setCount(current);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          animate();
        }
      },
      { threshold: 0.5 }
    );

    const el = counterRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [start, end, duration]);

  return (
    <div ref={counterRef} className="text-4xl md:text-5xl font-bold mb-2">
      {count.toLocaleString()}
      {suffix}
    </div>
  );
};

export default AnimatedCounter;
