import React from 'react'
import reactCSS from 'reactcss'
import { FaTint } from 'react-icons/fa';
import Sparkles from 'react-sparkle';

function ChosenNailPolishItem(nailPolish) {
    const styles = reactCSS({
        'default': {
          color: {
            width: '100px',
            height: '100px',
            borderRadius: '100px',
            background: nailPolish.nailPolish.color
          },
          colorIcon: {
            width: '100px',
            height: '100px',
            borderRadius: '100px',
            background: nailPolish.nailPolish.color,
            color: `rgba(255,255,255,.4)`,
            marginBottom:'7px'
          },
          swatch: {
            padding: '10px',
            background: '#d7eaf3',
            borderRadius: '100px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
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

            <div style={ styles.swatch }>
                <div style={ styles.color }>
                {nailPolish.nailPolish.type === 'sparkly' ?
                    (
                        <Sparkles
                            color="white"
                            count={30}
                            minSize={5}
                            maxSize={18}
                            overflowPx={10}
                            fadeOutSpeed={13}
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
        
    )
}

export default ChosenNailPolishItem