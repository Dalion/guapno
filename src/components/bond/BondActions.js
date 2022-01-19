import classes from './BondTable.module.css';
import { Button, TextField } from '@mui/material';
import { useCallback, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { setMessage } from '../../store/message/messageSlice';
import { getBonds } from '../../store/bond/bondSlice';
import { useDispatch } from 'react-redux';

function BondActions() {
  const dispatch = useDispatch();
  const [token, setToken] = useState('');

  const onTokenInputChange = useCallback((e) => {
    setToken(e.target.value);
  }, []);
  const onSearchBondButtonClick = useCallback(() => {
    if (isEmpty(token)) {
      dispatch(setMessage('Необходимо заполнить поле token'));
    } else {
      dispatch(getBonds(token));
    }
  }, [dispatch, token]);

  return (
      <div className={classes.controlArea}>
        <TextField
            value={token}
            onChange={onTokenInputChange}
            label="Введите token"
        />
        <Button variant="contained" onClick={onSearchBondButtonClick}>
          Получить облигации
        </Button>
      </div>
  );
}

export default BondActions;
