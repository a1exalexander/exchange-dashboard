import React from 'react';
import { connect } from 'react-redux';
import {
  thresholdsUpdateAlert,
  thresholdsUpdateAlertRequest,
  toggleResistanceLine,
} from '../store/actions';
import { getDistanceLevels } from '../store/getters';
import Checkbox from './common/form/Checkbox';
import { formatNumber } from '../utils/format';

const LevelsResistance = ({
  thresholds,
  thresholdsUpdateAlert,
  thresholdsUpdateAlertRequest,
  toggleResistanceLine,
  levels = []
}) => {
  const handleChange = e => {
    const { value } = e.target;
    thresholdsUpdateAlert(value, 'resistance');
  };

  const updateValue = e => {
    if (e) e.preventDefault();
    thresholdsUpdateAlertRequest('resistance');
  };

  const handleEnter = e => {
    if (e.key === 'Enter') {
      document.getElementById('resistance').blur();
    }
  };

  const levelsList = levels.map(({ idx, price, distance, chartLine }) => {
    return (
      <li className="levels__distance-item fadeIn" key={idx}>
        <div className="levels__distance-item-box">
          <span className="levels__value">{formatNumber(price)}</span>
          <span className="levels__value">{distance}%</span>
          <Checkbox className="levels__checkbox" onChange={() => toggleResistanceLine(idx)} checked={chartLine}/>
        </div>
      </li>
    );
  });

  return (
    <div className="levels">
      <div className="levels__head">
        <h3 className="levels__title">Resistance</h3>
        <input
          id="resistance"
          onChange={handleChange}
          onKeyUp={handleEnter}
          onBlur={updateValue}
          value={thresholds.resistance}
          type="number"
          placeholder="alert threshold in %"
          className="levels__input"
        />
      </div>
      <ul className="levels__distance-list">{levelsList}</ul>
    </div>
  );
};

export default connect(
  store => {
    return {
      thresholds: store.thresholdsModule,
      levels: getDistanceLevels(store, store.levelsModule.resistance, 'asc')
    };
  },
  { toggleResistanceLine, thresholdsUpdateAlert, thresholdsUpdateAlertRequest }
)(LevelsResistance);
