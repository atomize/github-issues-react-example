import React from 'react';

// Function to pad zeros on to inverted color return
const  padZero = (str, len) => {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

// Function to invert the color of the label text to make it more readable
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

// renders the labels and their text from the labels property of the API response object
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