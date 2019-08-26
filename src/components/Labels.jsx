import React from 'react';

const  padZero = (str, len) => {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

const invertColor = (hex, bw) => {
    if (hex.indexOf('#') === 0) { hex = hex.slice(1) }
    if (hex.length === 3) { hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] }
    if (hex.length !== 6) { throw new Error('Invalid HEX color.') }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? '#000000' : '#FFFFFF'
    }
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    return "#" + padZero(r) + padZero(g) + padZero(b)

}

const Labels = ({ labels }) => {
    let labelMap = labels.map((label, index) => {
        return <span key={index} style={{ backgroundColor: "#" + label.color, color: invertColor("#" + label.color, true) }} className={"tag " + (labels.length === 0 ? "is-hidden" : "")}>{label.name}</span>
    })
    return (
        <React.Fragment>
            {labelMap}
        </React.Fragment>
    )
}

export default Labels;