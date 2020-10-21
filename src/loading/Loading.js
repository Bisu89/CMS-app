import React from 'react'

function Loading() {
    return (
        <div className="vnt-loading">
            <svg viewBox="25 25 50 50">
                <circle cx={50} cy={50} r={20} fill="none" strokeWidth={5} strokeMiterlimit={10} />
            </svg>
        </div>
    )
}

export default Loading
