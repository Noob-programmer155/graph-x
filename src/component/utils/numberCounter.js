import React from 'react'

export function animateValue(obj, start, step, end, duration, format) {
  let startTimestamp = null;
  const step1 = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    if (progress < 1) {
      obj.innerHTML = Math.floor(step * (progress * (end - start) + start));
      window.requestAnimationFrame(step1);
    } else {
      obj.innerHTML = (step * (progress * (end - start) + start)).toFixed(format);
    }
  };
  window.requestAnimationFrame(step1);
}
