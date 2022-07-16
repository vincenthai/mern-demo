import React from 'react'
import {FaDice,FaSun,FaMoon} from 'react-icons/fa';
import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { getRandomPolishCombo, reset } from '../features/randomizer/randomizerSlice';
import Spinner from '../components/Spinner';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ChosenNailPolishItem from './ChosenNailPolishItem';
import ChosenPatternItem from './ChosenPatternItem';
import Fade from '@mui/material/Fade';


function Randomizer() {
    const [type, setType] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const dispatch = useDispatch();
    const {polish, pattern, isLoading, isSuccess} = useSelector((state) => state.polishCombo);

    const handleClose = () => {
        setOpen(false);
        dispatch(reset());
    }

    
    const style = {
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: '#77b5d9',
        border: '2px solid #d6eaf3',
        boxShadow: 24,
        borderRadius: '50px',
        p: 4,
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log({type});
        dispatch(getRandomPolishCombo({type}));
    };

    const onChange = (e) => {
        setType(e.target.value);
    };
    
    if(isLoading) {
        return <Spinner />
    }

    return (
        <div className="randomizer">
            <form onSubmit={onSubmit}>
            <button type="submit" className="btn-rdm btn-rdm-block" ><FaDice/></button>
                <FormControl>
                    <RadioGroup row aria-labelledby="demo-row-controlled-radio-buttons-group" name="type"
                            value={type}
                            onChange={onChange}>
                        <FormControlLabel value="light" control={<Radio />} label={<FaSun className='icon'/>} labelPlacement="bottom" />    
                        <FormControlLabel value="dark" control={<Radio />} label={<FaMoon className='icon'/>} labelPlacement="bottom" />
                    </RadioGroup>
                </FormControl>
            </form>
            <div className="chosen">
                <Modal
                    open={isSuccess}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Fade in={isSuccess}>
                        <Box sx={style}>
                            <center>
                                <ChosenPatternItem key={pattern._id} pattern={pattern} />
                                <ChosenNailPolishItem key={polish._id} nailPolish={polish} />
                            </center>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        </div>
    )
}

export default Randomizer