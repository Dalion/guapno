import map from 'lodash/map';
import isFinite from 'lodash/isFinite';

const bondMapper = (bondArr) => {
  return map(bondArr, bond => {
    return {
      ...bond,
      id: bond?.figi,
      aciValue: getAciValue(bond),
    };
  });
};

const getAciValue = (bond) => {
  const units = parseInt(bond?.aciValue?.units, 10);
  const nano = bond?.aciValue?.nano;
  if (isFinite(units)) {
    if (isFinite(nano)) {
      return units + (nano / Math.pow(10, 9));
    } else {
      return units;
    }
  }
}

export default bondMapper;
