import { Decimal } from 'decimal.js';

export const getDistanceLevels = (store) => (levels) => {
  const { volume_of_last = 0 } = store.statModule.stat || {};
  const result = levels.map((price, idx) => {
    return {
      idx,
      price,
      distance: volume_of_last
        ? new Decimal(volume_of_last)
            .minus(price)
            .div(Decimal.div(volume_of_last, 100))
            .toNumber()
        : 0
    };
  });
  return result;
};
