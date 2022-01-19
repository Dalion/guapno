export const bondColumns = [
  { field: 'figi', headerName: 'figi', minWidth: 150 },
  { field: 'ticker', headerName: 'ticker', minWidth: 150 },
  // { field: 'isin', headerName: 'isin', minWidth: 150 },
  // {
  //   field: 'minPriceIncrement',
  //   headerName: 'minPriceIncrement',
  //   type: 'number',
  //   minWidth: 220,
  // },
  {
    field: 'couponQuantityPerYear',
    headerName: 'couponQuantityPerYear',
    type: 'number',
    minWidth: 240,
  },
  // {
  //   field: 'lot',
  //   headerName: 'lot',
  //   type: 'number',
  //   minWidth: 110,
  // },
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
