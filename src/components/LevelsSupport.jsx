import React from 'react';
import { connect } from 'react-redux';
import {
  thresholdsUpdateAlert,
  thresholdsUpdateAlertRequest,
  removeSupportLevel
} from '../store/actions';
import { getDistanceLevels } from '../store/getters';
import RemoveButton from './common/buttons/RemoveButton';

const LevelsSupport = ({
  thresholds,
  thresholdsUpdateAlert,
  thresholdsUpdateAlertRequest,
  removeSupportLevel,
  levels = [],
}) => {
  const handleChange = e => {
    const { value } = e.target;
    thresholdsUpdateAlert(value, 'support');
  };

  const updateValue = e => {
    if (e) e.preventDefault();
    thresholdsUpdateAlertRequest('support');
  };

  const handleEnter = e => {
    if (e.key === 'Enter') {
      document.getElementById('support').blur();
    }
  };

  const levelsList = levels.map(({ idx, price, distance }) => {
    return (
      <li className="levels__distance-item fadeIn" key={idx}>
        <div className="levels__distance-item-box">
          <span className="levels__value">{price}</span>
          <span className="levels__value">{distance}%</span>
          <RemoveButton
            className="levels__remove-btn"
            onClick={() => removeSupportLevel(idx)}
          />
        </div>
      </li>
    );
  });

  return (
    <div className="levels">
      <div className="levels__head">
        <h3 className="levels__title">Support</h3>
        <input
          id='support'
          onChange={handleChange}
          onKeyUp={handleEnter}
          onBlur={updateValue}
          value={thresholds.support}
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
      levels: getDistanceLevels(store)(store.levelsModule.support)
    };
  },
  { thresholdsUpdateAlert, thresholdsUpdateAlertRequest, removeSupportLevel }
)(LevelsSupport);
