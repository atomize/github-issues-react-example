import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faComment,
} from '@fortawesome/free-solid-svg-icons'
const Comments = ({ data }) => {
    let jsx = <span className={data.comments < 1 ? "is-hidden" : "fa-layers  fa-lg comments"}  >
        <FontAwesomeIcon icon={faComment} transform="down-2 left-2">1</FontAwesomeIcon>
        <span className="fa-layers-counter fa-2x" transform="up-5" style={{ background: "LightGrey", color: "black" }}>{data.comments < 0 ? "" : data.comments}</span>
    </span>

    return (jsx);
}
export default Comments;