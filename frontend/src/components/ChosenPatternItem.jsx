import React from 'react'

function ChosenPatternItem({pattern}) {

    return (
        <div className="pattern">
            <div>
                <h2>{pattern.text}</h2>
            </div>
        </div>
    )
}

export default ChosenPatternItem