import React from 'react'
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { getPatterns } from '../features/patterns/patternSlice';
import { reset } from '../features/auth/authSlice';
import PatternForm from '../components/PatternForm';
import Spinner from '../components/Spinner';
import NailPolishForm from '../components/NailPolishForm';
import { getNailPolishes } from '../features/nailPolishes/nailPolishSlice';
import PatternItem from '../components/PatternItem';
import NailPolishItem from '../components/NailPolishItem';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth);
  const {patterns, isLoading, isError, message} = useSelector((state) => state.patterns);
  const {nailPolishes} = useSelector((state => state.nailPolishes));

  useEffect(() => {
    if(isError) {
      console.log(message);
    }

    if(!user) {
      navigate('/login');
    }

    dispatch(getPatterns());
    dispatch(getNailPolishes());

    return () => {
      dispatch(reset());
    }
  }, [user, navigate, isError, message, dispatch])

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>hey {user && user.name}</h1>
        <p>let's get you polished</p>
      </section>

      <div className="main-container">
        <div className='child-container'>
          <PatternForm/>
          <section className="content">
            {patterns.length > 0 ?
            (
              <div className="patterns">
                {patterns.map((pattern) => (
                  <PatternItem key={pattern._id} pattern={pattern} />
                ))}
              </div>
            ) : 
            (
              <h3>so unimaginative</h3>
            )
            }
          </section>
        </div>

        <div className='child-container'>
          <NailPolishForm/>
          <section className="content">
            {nailPolishes.length > 0 ?
            (
              <div className="polishes">
                {nailPolishes.map((nailPolish) => (
                  <NailPolishItem key={nailPolish._id} nailPolish={nailPolish} />
                ))}
              </div>
            ) : 
            (
              <h3>go buy some nail polish</h3>
            )
            }
          </section>
          </div>
        </div>
    </>
  )
}

export default Dashboard