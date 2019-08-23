import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faMapSigns,
} from '@fortawesome/free-solid-svg-icons'
const Milestones = ({ milestone, _addclass }) => {
    let jsx = <span className={!milestone ? "is-hidden" : "milestone" + " " + (_addclass ? [..._addclass] : "")}>
        <FontAwesomeIcon icon={faMapSigns} className="fa-lg" /> {!milestone ? "" : milestone.title}
    </span>
    return jsx;
}
export default Milestones;