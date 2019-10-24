import { Decimal } from 'decimal.js';

export const mapAnnotationsLine = (type) => (item, idx) => {
  let borderColor = 'red';
  switch (type) {
    case 'resistance':
      borderColor = 'red';
      break;
    case 'support':
      borderColor = 'blue';
      break;
    case 'custom':
      borderColor = 'green';
      break;
    default:
      break;
  }
  return {
    label: {
      enabled: false,
      content: 'Test label',
      position: 'right'
    },
    drawTime: 'afterDraw',
    borderColor,
    borderWidth: 0.5,
    mode: 'horizontal',
    type: 'line',
    value: item.price,
    scaleID: 'y-axis-0'
  };
};

export const getDistanceLevels = (store, levels, sortType) => {
  const { price = 0 } = store.statModule.stat;
  const result = levels.map((level, idx) => {
    return {
      ...level,
      distance: price
        ? new Decimal(price)
            .minus(level.price)
            .div(Decimal.div(price, 100))
            .toFixed(2)
        : 0
    };
  });
  switch (sortType) {
    case 'asc':
      return result.sort(({ price: a }, { price: b }) => a - b);
    case 'desc':
      return result.sort(({ price: a }, { price: b }) => b - a);
    default:
      return result;
  }
};

export const getAnnotations = store => {
  const resistance = store.levelsModule.resistance
    .filter(({ chartLine }) => chartLine)
    .map(mapAnnotationsLine('resistatnce'));
  const support = store.levelsModule.support
    .filter(({ chartLine }) => chartLine)
    .map(mapAnnotationsLine('support'));
  const custom = store.levelsModule.custom
    .filter(({ chartLine }) => chartLine)
    .map(mapAnnotationsLine('custom'));
  return [...resistance, ...support, ...custom];
};
