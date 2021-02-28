const css = {
  line: "progress-bar",
  start: "progress-bar start",
  finish: "progress-bar stop",
  fail: "progress-bar fail"
};

const el = document.createElement("div");
el.className = css.line;
window.document.body.appendChild(el);

let timer = null;
let pending = false;

const start = () => {
  clearTimeout(timer);
  if (pending) {
    restart();
  } else {
    pending = true;
    el.className = css.start;
  }
  return {
    finish,
    fail
  };
};

const restart = () => {
  el.className = css.finish;
  requestAnimationFrame(() => (el.className = css.start));
};

const finish = () => {
  clearTimeout(timer);
  pending = false;
  el.className = css.finish;
};

const fail = () => {
  pending = false;
  clearTimeout(timer);
  el.className = css.fail;
  timer = setTimeout(() => (el.className = css.finish), 1500);
};

export default {
  start
};
