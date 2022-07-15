import React from 'react'
import reactCSS from 'reactcss'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import { HexColorPicker } from "react-colorful";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { createNailPolish } from '../features/nailPolishes/nailPolishSlice';


function NailPolishForm() {
    const [nailPolishData, setNailPolishData] = useState({
        color: '',
        type: '',
    })

    const {color, type} = nailPolishData;

    const dispatch = useDispatch();

    const onChange = (e) => {
        setNailPolishData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createNailPolish(nailPolishData))
    };

    // color picker state and event handling
    const [colorPickerState, setColorPickerState] = useState({
        displayColorPicker: false,
        color: '#A67BBA',
    });

    const handleClick = (color) => {
        setColorPickerState({
            displayColorPicker: !colorPickerState.displayColorPicker,
            color: color,
        });
    }

    const handleClose = (color) => {
        setColorPickerState({
            displayColorPicker: false,
            color: color
        })
        setNailPolishData({
            color: colorPickerState.color,
            type: nailPolishData.type,
        })
    }

    const handleChange = (color) => {
        setColorPickerState({
            displayColorPicker: true,
            color: color
        })
    };
    
    const styles = reactCSS({
        'default': {
          color: {
            width: '50px',
            height: '18px',
            borderRadius: '10px',
            background: colorPickerState.color,
          },
          swatch: {
            padding: '4px',
            background: '#d7eaf3',
            borderRadius: '10px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
          },
          popover: {
            position: 'absolute',
            zIndex: '2',
          },
          cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
          },
        },
    });

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="nail-polish-form-group">
                <h2>add a polish</h2>                    
                    <label htmlFor='text'>color</label> 
                    <div style={ styles.swatch } onClick={handleClick}>
                        <div style={ styles.color } />
                    </div>
                    { colorPickerState.displayColorPicker ?
                        (
                            <div style={ styles.popover }>
                                <div style={ styles.cover } onClick={ handleClose }/>
                                <HexColorPicker color={color} onChange={handleChange} />
                            </div>
                        ): null
                    }
                    <br/>
                    <label htmlFor='text'>type</label>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-controlled-radio-buttons-group"
                            name="type"
                            value={type}
                            onChange={onChange}
                        >
                            <FormControlLabel value="cream" control={<Radio />} label="cream" labelPlacement="bottom" />
                            <FormControlLabel value="jelly" control={<Radio />} label="jelly" labelPlacement="bottom" />
                            <FormControlLabel value="sparkly" control={<Radio />} label="sparkly" labelPlacement="bottom"/>
                        </RadioGroup>
                    </FormControl>
                    <button type="submit" className="btn btn-block" onSubmit={onSubmit}>
                        add polish
                    </button>
                </div>
            </form>
        </section>
    )
}

export default NailPolishForm