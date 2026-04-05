"use client";

import {useEffect, useRef, useState} from "react";

export function useInView(options = {threshold: 0.1, triggerOnce: true}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (options.triggerOnce) obs.disconnect();
      }
    }, options);
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [options]);

  return [ref, inView];
}
