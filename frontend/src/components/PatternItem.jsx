import React from 'react'
import { FaRegTrashAlt } from 'react-icons/fa';
import {useDispatch} from 'react-redux';
import {deletePattern} from '../features/patterns/patternSlice';

function PatternItem({pattern}) {
    const dispatch = useDispatch();

    return (
        <div className="pattern">
            <div>
                <h2>{pattern.text}</h2>
                <button className='btn-del' onClick={() => dispatch(deletePattern(pattern._id))}>
                    <FaRegTrashAlt/>
                </button>
            </div>
        </div>
    )
}

export default PatternItem