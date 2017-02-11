const DT = 42; // 24 times/s
const V = 1000;
const eV = 0.002;

function calc(t) {
  return t < .5 ?
         4 * t * t * t :
         (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

export function ease(start, end, interval, finish) {
  let t = 0;
  const distance = end - start;
  const absDistance = Math.abs(distance);
  const expV = V + Math.exp(eV * absDistance);
  const T = (absDistance / expV) * 1000;
  const i = setInterval(() => {
    if (t < T) {
      const tt = t / T;

      interval(start + distance * calc(tt));
      t += DT;
    }
    else {
      clearInterval(i);
      finish(end);
    }
  }, DT);
}
