import { Decimal } from 'decimal.js';

export const getAnnotationLine = (type, value) => {
  const borderColor = type === 'resistance' ? 'red' : 'blue';
  return {
    label: {
      enabled: false,
      content: 'Test label',
      position: 'right'
    },
    drawTime: 'afterDraw',
    borderColor,
    borderWidth: 1,
    mode: 'horizontal',
    type: 'line',
    value,
    scaleID: 'y-axis-0'
  };
};

export const getDistanceLevels = store => levels => {
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
  return result;
};

export const getAnnotations = store => {
  const resistance = store.levelsModule.resistance
    .filter(({ chartLine }) => chartLine)
    .map((level, idx) =>
      getAnnotationLine('resistance', level.price)
    );
  const support = store.levelsModule.support
    .filter(({ chartLine }) => chartLine)
    .map((level, idx) => getAnnotationLine('support', level.price));
  return [...resistance, ...support];
};
