import React from 'react';
import * as appHelpers from '../utils/appHelpers';

const TimeAgoComponent = ({ data }) => {
    const createdAt = appHelpers.getTimeAgoString(new Date(data.created_at))
    const updatedAt = appHelpers.getTimeAgoString(new Date(data.updated_at))
    const user = data.user.login
    const whichTime = createdAt !== updatedAt
        ?
        `#${data.number} created ${createdAt} (updated ${updatedAt})`
        :
        `#${data.number} created ${createdAt}`
    let timeAgoString = `${whichTime} by ${user}`
    const assigneesString = `${(data.assignees.length > 0 ?
        ` ---  Assigned to: ${data.assignees.map(x => { return " " + x.login })}`
        : "")}`
    return (
        <React.Fragment>
            {timeAgoString + assigneesString}
        </React.Fragment>
    )
}
export default TimeAgoComponent;