import React from 'react'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createPattern} from '../features/patterns/patternSlice'


function PatternForm() {

    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(createPattern({text}));
        setText('');
    };

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">pattern</label>
                    <input type="text" name="text" id="text" value={text} onChange={(e) => setText(e.target.value)}/>
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type="submit">add pattern</button>
                </div>
            </form>
        </section>
    )
}

export default PatternForm