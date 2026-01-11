import React, { useEffect, useState } from 'react';
import './Main.scss';
import SingleCounter from '../singleCounter/SingleCounter';
import { useAppSelector } from '../../redux/store';


const Main = () => {
  const [date, setDate] = useState('');

  const counters = useAppSelector(state => state.counters.counters);
  const { profileNavigation } =
    useAppSelector(state => state.profile)

  useEffect(() => {
    const tick = () => setDate(new Date().toLocaleDateString('en-GB').split('/').join('. ') + ".");
    tick();
    const interval = setInterval(tick, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='main'>
      <div className="title-date">
        <div className='title'>Simple <span>Task Counter</span></div>
        <div className='date'>{date}</div>
      </div>
      <hr />
      {counters.map(counter => (
        <SingleCounter key={counter.id} id={counter.id} />
      ))}
      {profileNavigation}
    </div>
  );
};

export default Main;
