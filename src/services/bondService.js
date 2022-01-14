import axios from 'axios';

export function fetchBonds(token) {
  return axios.get('https://coproxy.herokuapp.com/rest/tinkoff.public.invest.api.contract.v1.InstrumentsService/Bonds', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
}
