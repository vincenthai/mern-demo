import React from 'react'
import reactCSS from 'reactcss'
import { FaRegTrashAlt } from 'react-icons/fa';
import {useDispatch} from 'react-redux';
import {deleteNailPolish} from '../features/nailPolishes/nailPolishSlice';

function NailPolishItem(nailPolish) {
    const dispatch = useDispatch();

    const styles = reactCSS({
        'default': {
          color: {
            width: '100px',
            height: '20px',
            borderRadius: '30px',
            background: nailPolish.nailPolish.color,
          },
          swatch: {
            padding: '5px',
            background: '#fff',
            borderRadius: '30px',
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
        <div className="pattern">
            <div style={ styles.swatch }>
                        <div style={ styles.color } />
                    </div>
            <div>
                <button className='btn-del' onClick={() => dispatch(deleteNailPolish(nailPolish.nailPolish._id))}>
                    <FaRegTrashAlt/>
                </button>
            </div>
        </div>
    )
}

export default NailPolishItem