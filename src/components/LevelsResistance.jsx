import React from 'react';
import { connect } from 'react-redux';
import {
  thresholdsUpdateAlert,
  thresholdsUpdateAlertRequest
} from '../store/actions';

const LevelsResistance = ({
  thresholds,
  thresholdsUpdateAlert,
  thresholdsUpdateAlertRequest
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

  return (
    <div className="levels">
      <div className="levels__head">
        <h3 className="levels__title">Resistance</h3>
        <input
          id='resistance'
          onChange={handleChange}
          onKeyUp={handleEnter}
          onBlur={updateValue}
          value={thresholds.resistance}
          type="number"
          placeholder="alert threshold in %"
          className="levels__input"
        />
      </div>
      <div className="levels__inner">
        <div className="levels__col">
          <span className="levels__value">{'8700'}</span>
          <span className="levels__value">{'-4.34'}%</span>
        </div>
        <div className="levels__col">
          <span className="levels__value">{'8700'}</span>
          <span className="levels__value">{'-4.34'}%</span>
        </div>
        <div className="levels__col">
          <span className="levels__value">{'8700'}</span>
          <span className="levels__value">{'-4.34'}%</span>
        </div>
        <div className="levels__col">
          <span className="levels__value">{'8700'}</span>
          <span className="levels__value">{'-4.34'}%</span>
        </div>
      </div>
    </div>
  );
};

export default connect(
  ({ thresholdsModule: thresholds }) => ({ thresholds }),
  { thresholdsUpdateAlert, thresholdsUpdateAlertRequest }
)(LevelsResistance);
