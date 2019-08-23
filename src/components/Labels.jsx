import React from 'react';
import * as appHelpers from '../utils/appHelpers';

const Labels = ({ labels }) => {
    let labelMap = labels.map((label, index) => {
        return <span key={index} style={{ backgroundColor: "#" + label.color, color: appHelpers.invertColor("#" + label.color, true) }} className={"tag " + (labels.length === 0 ? "is-hidden" : "")}>{label.name}</span>
    })
    return (
        <React.Fragment>
            {labelMap}
        </React.Fragment>
    )
}
export default Labels;