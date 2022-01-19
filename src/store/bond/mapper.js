import map from 'lodash/map';
import isNumber from 'lodash/isNumber';

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
  const units = bond?.aciValue?.units || '';
  const nano = bond?.aciValue?.nano;
  if (isNumber(nano)) {
    const unitsNumber = parseInt(units, 10);
    return unitsNumber + (nano / Math.pow(10, 9));
  } else {
    return undefined;
  }
}

export default bondMapper;
