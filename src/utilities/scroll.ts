//unceremoniously taken from cferdinandi's smooth-scroll library https://github.com/cferdinandi/smooth-scroll
//npm sucks
export type ScrollSettings = {
  ignore?: string,
  header?: any,
  topOnEmptyHash?: boolean,

  speed?: number,
  speedAsDuration?: boolean,
  durationMax?: any,
  durationMin?: any,
  clip?: boolean,
  offset?: number | Function,

  easing?: 
  | 'easeInQuad'
  | 'easeOutQuad'
  | 'easeInOutQuad'
  | 'easeInCubic'
  | 'easeOutCubic'
  | 'easeInOutCubic'
  | 'easeInQuart'
  | 'easeOutQuart'
  | 'easeInOutQuart'
  | 'easeInQuint'
  | 'easeOutQuint'
  | 'easeInOutQuint',
  customEasing?: any,

  updateURL?: boolean,
  popstate?: boolean,

  emitEvents?: boolean
} | null;

const defaults: ScrollSettings = {
  ignore: '[data-scroll-ignore]',
  header: null,
  topOnEmptyHash: true,

  speed: 500,
  speedAsDuration: false,
  durationMax: null,
  durationMin: null,
  clip: true,
  offset: 0,

  easing: 'easeInOutCubic',
  customEasing: null,

  updateURL: true,
  popstate: true,

  emitEvents: true,
};

const supports = function() {
  return (
    'querySelector' in document &&
    'addEventListener' in window &&
    'requestAnimationFrame' in window &&
    'closest' in window.Element.prototype
  );
}

const extend = function(...args: any[]) {
  let merged = {};
  Array.prototype.forEach.call(arguments, function (obj) {
    for(var key in obj) {
      if(!obj.hasOwnProperty(key)) return;
      merged[key] = obj[key];
    }
  });
  return merged;
}

const reduceMotion = function() {
  if('matchMedia' in window && window.matchMedia('(prefers-reduced-motion)').matches) return true;
  return false;
}

const getHeight = function(elem: Element) {
  const h = window.getComputedStyle(elem).height;
  return typeof h === 'number' ? parseInt(h, 10) : 'NaN';
}

const escapeCharacters = function(id) {
  if(id.charAt(0) === '#') {
    id = id.substr(1);
  }

  let string = String(id);
  let length = string.length;
  let index = -1;
  let codeUnit;
  let result = '';
  let firstCodeUnit = string.charCodeAt(0);
  while(++index < length) {
    codeUnit = string.charCodeAt(index);

    if(codeUnit === 0x0000) {
      //@ts-ignore
      throw new InvalidCharacterError(
        'Invalid character: the input contains U+0000.'
      );
    }

    if(
        // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
				// U+007F, […]
				(codeUnit >= 0x0001 && codeUnit <= 0x001F) || codeUnit === 0x007F ||
				// If the character is the first character and is in the range [0-9]
				// (U+0030 to U+0039), […]
				(index === 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
				// If the character is the second character and is in the range [0-9]
				// (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
				(
					index === 1 &&
					codeUnit >= 0x0030 && codeUnit <= 0x0039 &&
					firstCodeUnit === 0x002D
				)
    ) {
      result += '\\' + codeUnit.toString(16) + ' ';
      continue;
    }

    if(
      // eslint-disable-next-line
      codeUnit >= 0x0080 || codeUnit === 0x002D || codeUnit === 0x005F ||
      // eslint-disable-next-line
      codeUnit >= 0x0030 && codeUnit <= 0x0039 || codeUnit >= 0x0041 && codeUnit <= 0x005A ||
      // eslint-disable-next-line
      codeUnit >= 0x0061 && codeUnit <= 0x007A
    ) {
      result += string.charAt(index);
      continue;
    }

    result += '\\' + string.charAt(index);
  }

  return '#' + result;
}

const easingPattern = function(settings, time) {
  let pattern;

  // Default Easing Patterns
  if (settings.easing === 'easeInQuad') pattern = time * time; // accelerating from zero velocity
  if (settings.easing === 'easeOutQuad') pattern = time * (2 - time); // decelerating to zero velocity
  if (settings.easing === 'easeInOutQuad') pattern = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
  if (settings.easing === 'easeInCubic') pattern = time * time * time; // accelerating from zero velocity
  if (settings.easing === 'easeOutCubic') pattern = (--time) * time * time + 1; // decelerating to zero velocity
  if (settings.easing === 'easeInOutCubic') pattern = time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
  if (settings.easing === 'easeInQuart') pattern = time * time * time * time; // accelerating from zero velocity
  if (settings.easing === 'easeOutQuart') pattern = 1 - (--time) * time * time * time; // decelerating to zero velocity
  if (settings.easing === 'easeInOutQuart') pattern = time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
  if (settings.easing === 'easeInQuint') pattern = time * time * time * time * time; // accelerating from zero velocity
  if (settings.easing === 'easeOutQuint') pattern = 1 + (--time) * time * time * time * time; // decelerating to zero velocity
  if (settings.easing === 'easeInOutQuint') pattern = time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; // acceleration until halfway, then deceleration

  // Custom Easing Patterns
  if (!!settings.customEasing) pattern = settings.customEasing(time);

  return pattern || time; // no easing, no acceleration
}

const getDocumentHeight = function() {
  return Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
}

const getEndLocation = function(anchor, headerHeight, offset, clip) {
  let location = 0;
  if(anchor.offsetParent) {
    do {
      location += anchor.offsetTop;
      anchor = anchor.offsetParent;
    } while(anchor);
  }
  location = Math.max(location - headerHeight - offset, 0);
  if(clip) {
    location = Math.min(location, getDocumentHeight() - window.innerHeight);
  }
  return location;
}

const getHeaderHeight = function(header) {
  return !header ? 0 : (getHeight(header) + header.offsetTop);
}

const getSpeed = function(distance, settings) {
  let speed = settings.speedAsDuration ? settings.speed : Math.abs(distance / 1000 * settings.speed);
  if(settings.durationMax && speed > settings.durationMax) return settings.durationMax;
  if(settings.durationMin && speed < settings.durationMin) return settings.durationMin;
  return parseInt(speed, 10);
}

const setHistory = function(options) {
  if(!window.history.replaceState || !options.updateURL || window.history.state) return;

  let hash = window.location.hash;
  hash = hash ? hash : '';

  window.history.replaceState(
    {
      scroll: JSON.stringify(options),
      anchor: hash ? hash : window.pageYOffset
    },
    document.title,
    hash ? hash : window.location.href
  );
}

const updateURL = function(anchor, isNum, options) {
  if(isNum) return;
  
  if(!window.history.pushState || !options.updateURL) return;

  window.history.pushState(
    {
      scroll: JSON.stringify(options),
      anchor: anchor.id
    },
    document.title,
    anchor === document.documentElement ? '#top' : '#' + anchor.id
  );
}


const adjustFocus = function(anchor, endLocation, isNum) {
  if(anchor === 0) document.body.focus();

  if(isNum) return;

  anchor.focus();

  if(document.activeElement!==anchor) {
    anchor.setAttribute('tabindex', '-1');
    anchor.focus();
    anchor.style.outline = 'none';
  }
  window.scrollTo(0, endLocation);
};

const emitEvent = function(type, options, anchor?, toggle?) {
  if(!options.emitEvents || typeof window.CustomEvent !== 'function') return;
  let event = new CustomEvent(type, {
    bubbles: true,
    detail: {
      anchor: anchor,
      toggle: toggle
    }
  });
  document.dispatchEvent(event);
}

export const scroll = function(selector, options?: ScrollSettings) {
  let scroll: any = {};
  // eslint-disable-next-line
  let settings: ScrollSettings, anchor, toggle, fixedHeader, eventTimeout, animationInterval;

  scroll.cancelScroll = function(noEvent) {
    cancelAnimationFrame(animationInterval);
    animationInterval = null;
    if(noEvent) return;
    emitEvent('scrollCancel', settings);
  }

  scroll.animateScroll = function(anchor, toggle, options) {
    scroll.cancelScroll();

    let _settings: ScrollSettings = extend(settings || defaults, options || {});

    let isNum = Object.prototype.toString.call(anchor) === '[object Number]' ? true : false;
    let anchorElem = isNum || !anchor.tagName ? null: anchor;
    if(!isNum && !anchorElem) return;
    let startLocation = window.pageYOffset;
    if(_settings.header && !fixedHeader) {
      fixedHeader = document.querySelector(_settings.header);
    }

    let headerHeight = getHeaderHeight(fixedHeader);
    let endLocation = isNum ? anchor : getEndLocation(anchorElem, headerHeight, parseInt((typeof _settings.offset === 'function' ? _settings.offset(anchor, toggle) : _settings.offset), 10), _settings.clip);
    let distance = endLocation - startLocation;
    let documentHeight = getDocumentHeight();
    let timeLapsed = 0;
    let speed = getSpeed(distance, _settings);
    let start, percentage, position;

    const stopAnimateScroll = function(position, endLocation) {
      let currentLocation = window.pageYOffset;
      if(position === endLocation || currentLocation === endLocation || ((startLocation < endLocation && window.innerHeight + currentLocation) >= documentHeight)) {
        scroll.cancelScroll(true);
        adjustFocus(anchor, endLocation, isNum);

        emitEvent('scrollStop', _settings, anchor, toggle);

        start = null;
        animationInterval = null;

        return true;
      }
    }

    const loopAnimateScroll = function(timestamp) {
      if(!start) start = timestamp;
      timeLapsed += timestamp - start;
      percentage = speed === 0 ? 0 : (timeLapsed / speed);
      percentage = (percentage > 1) ? 1 : percentage;
      position = startLocation + (distance * easingPattern(_settings, percentage));
      window.scrollTo(0, Math.floor(position));
      if(!stopAnimateScroll(position, endLocation)) {
        animationInterval = window.requestAnimationFrame(loopAnimateScroll);
        start = timestamp;
      }
    }

    if(window.pageYOffset === 0) {
      window.scrollTo(0, 0);
    }

    updateURL(anchor, isNum, _settings);

    if(reduceMotion()) {
      window.scrollTo(0, Math.floor(endLocation));
      return;
    }

    emitEvent('scrollStart', _settings, anchor, toggle);

    scroll.cancelScroll(true);
    window.requestAnimationFrame(loopAnimateScroll);
  }

  const clickHandler = function(event) {
    if(event.defaultPrevented) return;
    if(event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;

    if(!('closest' in event.target)) return;

    toggle = event.target.closest(selector);
    if(!toggle || toggle.tagName.toLowerCase() !== 'a' || event.target.closest(settings.ignore)) return;

    if(toggle.hostname !== window.location.hostname || toggle.pathname !== window.location.pathname || !/#/.test(toggle.href)) return;

    let hash = escapeCharacters(toggle.hash);

    let anchor;
    if(hash === '#') {
      if(!settings.topOnEmptyHash) return;
      anchor = document.documentElement;
    } else {
      anchor = document.querySelector(hash);
    }
    anchor = !anchor && hash === '#top' ? document.documentElement : anchor;

    if(!anchor) return;
    event.preventDefault();
    setHistory(settings);
    scroll.animateScroll(anchor, toggle);
  }

  const popstateHandler = function(event) {
    if(window.history.state === null) return;

    if(!window.history.state.scroll || window.history.state.scroll !== JSON.stringify(settings)) return;

    let anchor = window.history.state.anchor;
    if(typeof anchor === 'string' && anchor) {
      anchor = document.querySelector(escapeCharacters(window.history.state.anchor));
      if(!anchor) return;
    }
    
    scroll.animateScroll(anchor, null, {updateURL: false});
  }

  scroll.destroy = function() {
    if(!settings) return;

    document.removeEventListener('click', clickHandler, false);
    window.removeEventListener('popstate', popstateHandler, false);

    scroll.cancelScroll();

    settings = null;
    anchor = null;
    toggle = null;
    fixedHeader = null;
    eventTimeout = null;
    animationInterval = null;
  }

  const init = function() {
    // eslint-disable-next-line
    if(!supports()) throw 'This browser can\'t smooth scroll! Yikes!';

    scroll.destroy();

    settings = extend(defaults, options || {});
    fixedHeader = settings.header ? document.querySelector(settings.header) : null;

    document.addEventListener('click', clickHandler, false);
    if(settings.updateURL && settings.popstate) {
      window.addEventListener('popstate', popstateHandler, false);
    }
  }

  init();

  return scroll;
}