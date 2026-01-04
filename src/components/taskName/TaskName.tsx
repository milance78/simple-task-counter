import React from 'react';
import { useAppDispatch } from '../../redux/store';
import { setEditing, updateGivenCounterName } from '../../redux/features/countersSlice';
import './TaskName.scss';

interface Props {
  counter: any; // can type more strictly
  width: number;
  font: string;
}

const TaskName: React.FC<Props> = ({ counter, width, font }) => {
  const dispatch = useAppDispatch();

  const confirmEdit = () => {
    dispatch(updateGivenCounterName({ id: counter.id, name: counter.name }));
    dispatch(setEditing({ id: counter.id, isEditing: false }));
  };

  return (
    <div className={`task-name-wrapper`}>
      {counter.isEditing ? (
        <input
          autoFocus
          value={counter.name}
          style={{ width, font }}
          className="counter-name"
          onChange={(e) =>
            dispatch(updateGivenCounterName({ id: counter.id, name: e.target.value }))
          }
          onBlur={confirmEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') confirmEdit();
            if (e.key === 'Escape') dispatch(setEditing({ id: counter.id, isEditing: false }));
          }}
        />
      ) : (
        <span
          className="counter-name"
          style={{ width, font }}
          onClick={() => dispatch(setEditing({ id: counter.id, isEditing: true }))}
        >
          {counter.name || '\u00A0'}
        </span>
      )}
    </div>
  );
};

export default TaskName;