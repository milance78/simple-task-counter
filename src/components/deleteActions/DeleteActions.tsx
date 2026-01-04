import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { removeCounter } from '../../redux/features/countersSlice';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import './DeleteActions.scss';

interface Props {
  counterId: string;
}

const DeleteActions: React.FC<Props> = ({ counterId }) => {
  const dispatch = useAppDispatch();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleMouseLeave = () => {
    const timeOut = setTimeout(() => {
      setConfirmDelete(false);
      clearTimeout(timeOut);
    }, 200);
  };

  return (
    <div
      className="delete-actions"
      onMouseLeave={handleMouseLeave}
    >
      {confirmDelete ? (
        <>
          <CheckIcon
            className="icon"
            onClick={() => dispatch(removeCounter(counterId))}
          />
          <CloseIcon
            className="icon"
            onClick={() => setConfirmDelete(false)}
          />
        </>
      ) : (
        <DeleteOutlineIcon
          className="icon"
          onClick={() => setConfirmDelete(true)}
        />
      )}
    </div>
  );
};

export default DeleteActions;
