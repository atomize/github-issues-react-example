var showdown  = require('showdown')

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}
export const invertColor = (hex, bw) => {
    if (hex.indexOf('#') === 0) { hex = hex.slice(1) }
    if (hex.length === 3) { hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] }
    if (hex.length !== 6) { throw new Error('Invalid HEX color.') }
    var r = parseInt(hex.slice(0, 2), 16), 
        g = parseInt(hex.slice(2, 4), 16), 
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? '#000000' : '#FFFFFF'
    }
    r = (255 - r).toString(16); g = (255 - g).toString(16); b = (255 - b).toString(16);
    return "#" + padZero(r) + padZero(g) + padZero(b)

}

export const getTimeAgoString = (timestamp) => {
    const SECOND = 1000,
        MINUTE = SECOND * 60,
        HOUR = MINUTE * 60,
        DAY = HOUR * 24,
        MONTH = DAY * 30,
        YEAR = DAY * 365;

    const elapsed = Date.now() - timestamp,
        getElapsedString = (value, unit) => {
            const round = Math.round(elapsed / value);
            return `${round} ${unit}${round > 1
                ? 's'
                : ''} ago`;
        };
    if (elapsed < MINUTE) {
        return getElapsedString(SECOND, 'second');
    }
    if (elapsed < HOUR) {
        return getElapsedString(MINUTE, 'minute');
    }
    if (elapsed < DAY) {
        return getElapsedString(HOUR, 'hour');
    }
    if (elapsed < MONTH) {
        return getElapsedString(DAY, 'day');
    }
    if (elapsed < YEAR) {
        return getElapsedString(MONTH, 'month');
    }
    return getElapsedString(YEAR, 'year');
}

export const encodeQueryString = (params) => {
    const keys = Object.keys(params)
    return keys.length
        ? "?" + keys
            .map(key => encodeURIComponent(key)
                + "=" + encodeURIComponent(params[key]))
            .join("&")
        : ""
}
export const converter = new showdown.Converter({
    tables: true,
    strikethrough: true,
    ghCompatibleHeaderId: true,
    literalMidWordUnderscores: true,
    ghCodeBlocks: true,
    tasklists: true,
    ghMentions: true,
    ghMentionsLink: 'https://github.com/{u}'
})

export function parseLinkHeader(header) {
    if (header.length === 0) {
        throw new Error("input must not be of zero length");
    }

    // Split parts by comma and parse each part into a named link
    return header.split(/(?!\B"[^"]*),(?![^"]*"\B)/).reduce((links, part) => {
        const section = part.split(/(?!\B"[^"]*);(?![^"]*"\B)/);
        if (section.length < 2) {
            throw new Error("section could not be split on ';'");
        }
        const url = section[0].replace(/<(.*)>/, '$1').trim();
        const name = section[1].replace(/rel="(.*)"/, '$1').trim();

        links[name] = url;

        return links;
    }, {});
}
export function promiseMap(xs, f) {
    const reducer = (ysAcc$, x) =>
      ysAcc$.then(ysAcc =>
        f(x).then(y => {
          ysAcc[x] = y;
          return ysAcc;
        })
      );
    return xs.reduce(reducer, Promise.resolve({}));
  }
  