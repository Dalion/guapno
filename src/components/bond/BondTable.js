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

const columns = [
  { field: 'figi', headerName: 'figi', minWidth: 150 },
  { field: 'ticker', headerName: 'ticker', minWidth: 150 },
  // { field: 'isin', headerName: 'isin', minWidth: 150 },
  {
    field: 'minPriceIncrement',
    headerName: 'minPriceIncrement',
    type: 'number',
    minWidth: 220,
  },
  {
    field: 'couponQuantityPerYear',
    headerName: 'couponQuantityPerYear',
    type: 'number',
    minWidth: 220,
  },
  {
    field: 'lot',
    headerName: 'lot',
    type: 'number',
    minWidth: 110,
  },
  {
    field: 'aciValue',
    headerName: 'aciValue',
    type: 'number',
    minWidth: 150,
  },
  {
    field: 'currency',
    headerName: 'currency',
    minWidth: 150,
  },
  {
    field: 'name',
    headerName: 'name',
    minWidth: 370,
  },
];

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
            columns={columns}
            pageSize={10}
            onRowClick={onRowClick}
            getRowClassName={getRowClassName}
        />
      </div>
  );
}

export default BondTable;
