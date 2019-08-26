import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCheck,
    faExclamationCircle,
    faCodeBranch,
    faCircle
} from '@fortawesome/free-solid-svg-icons'

// exclamation circle with added check option for issue icon
const IssueIconStack = ({ state }) => {
    return (
        <span className="fa-layers fa-fw fa-2x">
            <FontAwesomeIcon icon={faCircle} color={state} />
            <FontAwesomeIcon
                className="fa-inverse"
                icon={faExclamationCircle}
                color={state}
                transform="shrink-2"
            />
            {
                state === "red" &&
                <FontAwesomeIcon
                    icon={faCheck}
                    color={state}
                    transform="shrink-10 right-5 up-4"
                />
            }
        </span>
    )
}

// code branch and check icon stack for PR icon
const PrIconStack = ({ state }) => {
    return (
        <span className="fa-layers fa-fw fa-2x">
            <FontAwesomeIcon
                icon={faCodeBranch}
                color={state}
                transform="shrink-4"
            />
            {
                state === "red" ?
                    <FontAwesomeIcon
                        icon={faCheck}
                        color={state}
                        transform="shrink-8 right-4 down-4"
                    />
                    : ""
            }
        </span>
    )
}

// renders the appropriate stacked icon for each issue/pr and applies color accordnig to open/closed state 
const StackedIcons = ({ type, state }) => {
    const iconColor = (state === "closed" ? "red" : "green")
    let jsx = type ? <IssueIconStack state={iconColor} type={type} />
        : <PrIconStack state={iconColor} type={type} />
    return (jsx)
}

export default StackedIcons;