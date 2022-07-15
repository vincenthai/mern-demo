import React from 'react'
import reactCSS from 'reactcss'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import { HexColorPicker } from "react-colorful";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


function NailPolishForm() {
    const [nailPolishData, setNailPolishData] = useState({
        name: '',
        color: '',
        type: '',
    })

    const {name, color, type} = nailPolishData;

    const dispatch = useDispatch();

    const onChange = (e) => {
        setNailPolishData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(nailPolishData);
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
            name: nailPolishData.name
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
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            background: colorPickerState.color,
          },
          swatch: {
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
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
                    <label htmlFor='text'>Name</label>
                    <input type='text' name='name' id='name' value={name} onChange={onChange}/>
                    
                    <label htmlFor='text'>Color</label>
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
                    <label htmlFor='text'>Type</label>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-controlled-radio-buttons-group"
                            name="type"
                            value={type}
                            onChange={onChange}
                        >
                            <FormControlLabel value="Cream" control={<Radio />} label="Cream" labelPlacement="bottom" />
                            <FormControlLabel value="Gelly" control={<Radio />} label="Gelly" labelPlacement="bottom" />
                            <FormControlLabel value="Sparkly" control={<Radio />} label="Sparkly" labelPlacement="bottom"/>
                        </RadioGroup>
                    </FormControl>
                    <button type="submit" className="btn btn-block">
            Submit
          </button>
                </div>
            </form>
        </section>
    )
}

export default NailPolishForm