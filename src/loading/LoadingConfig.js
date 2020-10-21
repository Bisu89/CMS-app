import React from 'react'
import './style.css'

function LoadingConfig() {
    return (
        <div className="config-box__loader">
            <div className="config-loader">
                <svg viewBox="25 25 50 50" className="svg-loader">
                    <circle cx={50} cy={50} r={20} fill="none" strokeWidth={5} strokeMiterlimit={10} />
                </svg>
            </div>
        </div>
    )
}

export default LoadingConfig
