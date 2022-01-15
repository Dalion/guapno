import axios from 'axios';

export function fetchBonds(token) {
  return axios.post('https://coproxy.herokuapp.com/rest/tinkoff.public.invest.api.contract.v1.InstrumentsService/Bonds', 
  {
    "instrumentStatus": "INSTRUMENT_STATUS_UNSPECIFIED"
  },
  {
    dataType: 'json',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
}
