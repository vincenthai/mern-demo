import React from 'react'
import reactCSS from 'reactcss'
import { FaRegTrashAlt, FaTint } from 'react-icons/fa';
import {useDispatch} from 'react-redux';
import {deleteNailPolish} from '../features/nailPolishes/nailPolishSlice';
import Sparkles from 'react-sparkle';

function NailPolishItem(nailPolish) {
    const dispatch = useDispatch();

    const styles = reactCSS({
        'default': {
          color: {
            width: '30px',
            height: '30px',
            borderRadius: '30px',
            background: nailPolish.nailPolish.color
          },
          colorIcon: {
            width: '30px',
            height: '30px',
            borderRadius: '30px',
            background: nailPolish.nailPolish.color,
            color: `rgba(255,255,255,.4)`,
            marginBottom:'7px'
          },
          swatch: {
            padding: '7px',
            background: '#d7eaf3',
            borderRadius: '30px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
            position: 'relative',
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
        <div className="polish">
            <div style={ styles.swatch }>
                <div style={ styles.color }>
                {nailPolish.nailPolish.type === 'sparkly' ?
                    (
                        <Sparkles
                            color="white"
                            count={15}
                            minSize={5}
                            maxSize={10}
                            overflowPx={5}
                            fadeOutSpeed={15}
                            flicker={false}
                        />
                    ) : null
                }
                {nailPolish.nailPolish.type === 'jelly' ?
                    (
                        <FaTint style={ styles.colorIcon }/>
                    ) : null
                }
                </div>
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