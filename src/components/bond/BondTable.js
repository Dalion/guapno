import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBonds,
  selectBondsLoadingResponseMessage,
  selectBondsLoadingStatus,
} from '../../store/bond/bondSelectors';
import classes from './BondTable.module.css';
import { Backdrop } from '@mui/material';
import { LOADING_STATUSES } from '../../store/bond/constants';
import BondActions from './BondActions';
import { useCallback, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { setMessage } from '../../store/message/messageSlice';
import isEqual from 'lodash/isEqual';
import { bondColumns } from './constants';

function BondTable() {
  const dispatch = useDispatch();
  const bonds = useSelector(selectBonds, isEqual);
  const loadingStatus = useSelector(selectBondsLoadingStatus);
  const loadingResponseMessage = useSelector(selectBondsLoadingResponseMessage);

  useEffect(() => {
    if (!isEmpty(loadingResponseMessage)) {
      dispatch(setMessage(`Произошла ошибка: ${loadingResponseMessage}`));
    }
  }, [loadingResponseMessage]);

  const onRowClick = useCallback((e) => {
    const ticker = e?.row?.ticker;
    if (!isEmpty(ticker)) {
      window.open(`https://www.tinkoff.ru/invest/bonds/${ticker}/?utm_source=security_share`, '_blank');
    }
  }, []);
  const getRowClassName = useCallback((e) => {
    const ticker = e?.row?.ticker;
    if (!isEmpty(ticker)) {
      return 'cursor-pointer';
    }
  }, []);

  return (
      <div className={classes.container}>
        <Backdrop open={loadingStatus === LOADING_STATUSES.loading} />
        <BondActions />
        <DataGrid
            rows={bonds}
            columns={bondColumns}
            pageSize={10}
            onRowClick={onRowClick}
            getRowClassName={getRowClassName}
        />
      </div>
  );
}

export default BondTable;
