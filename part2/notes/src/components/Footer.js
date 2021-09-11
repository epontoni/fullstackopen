import React from 'react'

const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 15
    }

    return (
        <div style={footerStyle}>
            <br />
            <em>Note app, Department of Computer Science, EP Soft { new Date().getFullYear() }</em>
        </div>
    )
}

export default Footer