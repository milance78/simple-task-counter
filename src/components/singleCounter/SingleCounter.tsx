import React, { useRef, useLayoutEffect } from 'react';
import { useAppSelector } from '../../redux/store';
import TaskName from '../taskName/TaskName';
import DeleteActions from '../deleteActions/DeleteActions';
import CounterSection from '../counterSection/CounterSection';

import './SingleCounter.scss';

interface Props {
  id: string;
}

const FONT = '25px Roboto';

const SingleCounter: React.FC<Props> = ({ id }) => {
  const counter = useAppSelector(state =>
    state.counters.counters.find(c => c.id === id)
  );

  const mirrorRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = React.useState(10);

  // Safe useLayoutEffect for input width measurement
  useLayoutEffect(() => {
    if (counter && mirrorRef.current) {
      const w = mirrorRef.current.getBoundingClientRect().width;
      setWidth(w || 10);
    }
  }, [counter]); // dependency fixed

  if (!counter) return null;

  return (
    <>
      {/* Mirror span for exact width */}
      <span
        ref={mirrorRef}
        className="mirror-span"
        style={{ font: FONT }}
      >
        {counter.name || '\u00A0'}
      </span>

      <div className="single-counter">
        <CounterSection counter={counter} />
        <div className="name-group">
          <TaskName
            counter={counter}
            width={width}
            font={FONT} />
          <DeleteActions counterId={id} />
        </div>
      </div>
      <hr />
    </>
  );
};

export default SingleCounter;

