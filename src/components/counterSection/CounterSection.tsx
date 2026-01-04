import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { incrementGivenCounter, decrementGivenCounter } from '../../redux/features/countersSlice';
import minusOne from '../../assets/img/minus one.png';

import './CounterSection.scss';

interface Props {
  counter: {
    id: string;
    value: number;
  };
}

const CounterSection: React.FC<Props> = ({ counter }) => {
  const dispatch = useAppDispatch();
  const color = useAppSelector(state =>
    state.counters.counters.find(c => c.id === counter.id)?.color
  );
  const [isDecrementVisible, setIsDecrementVisible] = useState(false);
  const [disableRipple, setDisableRipple] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);


  // Right-click handler
  const contextMenuHandler = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ev.preventDefault(); // stop browser context menu
    setIsDecrementVisible(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        counterRef.current &&
        !counterRef.current.contains(event.target as Node)
      ) {
        setIsDecrementVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="counter-section"
      ref={counterRef}
      >
      {/* WRAPPER DIV for right-click */}
      <div className="value-wrapper" onContextMenu={contextMenuHandler}>
        <Button
          className={`value ${color}`}
          disableRipple={disableRipple}
          onClick={() => {
            dispatch(incrementGivenCounter(counter.id));
             setIsDecrementVisible(false);
          }}
          onMouseDown={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            if (e.button === 2) {
              e.preventDefault(); // stop right-click highlight
              e.currentTarget.blur(); // remove focus
              setDisableRipple(true); // disable ripple for this right-click
            } else {
              setDisableRipple(false); // enable ripple for left-click
            }
          }}
        >
          {counter.value}
        </Button>
      </div>

      {/* DECREMENT BUTTON */}
      {isDecrementVisible && (
        <Button
          className="decrement"
          onMouseLeave={() =>setIsDecrementVisible(false)}
          onClick={() => {
            dispatch(decrementGivenCounter(counter.id));
          }}
        >
          <img src={minusOne} alt="minus one" />
        </Button>
      )}
    </div>
  );
};

export default CounterSection;
