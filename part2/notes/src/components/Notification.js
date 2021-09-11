import React from "react";
import '../index.css'

const Notification = (props) => {
    return (
        props.show
            ? (<div className="notification active">{props.text}</div>)
            : (<div className="notification">{props.text}</div>)
    )
}

export default Notification