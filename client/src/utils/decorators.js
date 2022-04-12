export function debounce(func, timeout = 1000) {
  let ready = true;
  let timer = null;
  return () => {
    if (ready) {
      console.log('ready');
      func();
      ready = false;
    } else {
      console.log('not ready');
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      ready = true;
    }, timeout);
  };
}

export function throttle(func, timeout = 1000, instatnt = true) {
  let isInstant = instatnt;
  let timer,
    counter = 0;

  return function () {
    counter++;
    const delayed = () => {
      isInstant = true;
      if (counter > 1) func.apply(this, arguments);
      counter = 0;
    };

    if (isInstant) {
      func.apply(this, arguments);
      isInstant = false;
      timer = setTimeout(delayed, timeout);
    } else {
      clearTimeout(timer);
      timer = setTimeout(delayed, timeout);
    }
  };
}
