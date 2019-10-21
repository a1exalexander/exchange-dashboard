import React from 'react';
import { connect } from 'react-redux';
import { thresholdsUpdateAlert, thresholdsUpdateAlertRequest } from '../store/actions';

const SectionVolume = ({ stat, thresholds, thresholdsUpdateAlert, thresholdsUpdateAlertRequest }) => {
  
  const types = [
    ['volume_1m', '1m'],
    ['volume_5m', '5m'],
    ['volume_1h', '1h'],
    ['volume_1d', '1d'],
  ];

  const handleChange = (idx) => e => {
    const { value } = e.target;
    const { [idx]: { 0: type, 1: period },  } = types;
    thresholdsUpdateAlert({ type, value }, period);
  };

  const updateValue = (idx) => (e) => {
    if (e) e.preventDefault()
    const { [idx]: { 0: type, 1: period },  } = types;
    thresholdsUpdateAlertRequest(type, period);
  };

  const handleEnter = (idx) => (e) => {
    if (e.key === 'Enter') {
      document.getElementById(types[idx][0]).blur();
    }
  }

  return (
    <div className="section">
      <ul className="section__list">
        <li className="section__item">
          <div className="section__wrapper">
            <span className="section__value section__value--col">
              1m USD Volume Change
            </span>
            <input
              id={types[0][0]}
              type="text"
              value={thresholds.volume_1m}
              onChange={handleChange(0)}
              onKeyUp={handleEnter(0)}
              onBlur={updateValue(0)}
              placeholder="alert threshold in %"
              className="section__input section__input--level"
            />
          </div>
          <span className="section__value">{stat.volume_change_1m}</span>
        </li>
        <li className="section__item">
          <div className="section__wrapper">
            <span className="section__value section__value--col">
              5m USD Volume Change
            </span>
            <input
              id={types[1][0]}
              type="text"
              value={thresholds.volume_5m}
              onChange={handleChange(1)}
              onKeyUp={handleEnter(1)}
              onBlur={updateValue(1)}
              placeholder="alert threshold in %"
              className="section__input section__input--level"
            />
          </div>
          <span className="section__value">{stat.volume_change_5m}</span>
        </li>
        <li className="section__item">
          <div className="section__wrapper">
            <span className="section__value section__value--col">
              1h USD Volume Change
            </span>
            <input
              id={types[2][0]}
              type="text"
              value={thresholds.volume_1h}
              onChange={handleChange(2)}
              onKeyUp={handleEnter(2)}
              onBlur={updateValue(2)}
              placeholder="alert threshold in %"
              className="section__input section__input--level"
            />
          </div>
          <span className="section__value">{stat.volume_change_1h}</span>
        </li>
        <li className="section__item">
          <div className="section__wrapper">
            <span className="section__value section__value--col">
              1d USD Volume Change
            </span>
            <input
              id={types[3][0]}
              type="text"
              value={thresholds.volume_1d}
              onChange={handleChange(3)}
              onKeyUp={handleEnter(3)}
              onBlur={updateValue(3)}
              placeholder="alert threshold in %"
              className="section__input section__input--level"
            />
          </div>
          <span className="section__value">{stat.volume_change_1d}</span>
        </li>
      </ul>
    </div>
  );
};

export default connect(
  ({ thresholdsModule: thresholds, statModule: { stat } }) => ({ thresholds, stat }),
  { thresholdsUpdateAlert, thresholdsUpdateAlertRequest }
)(SectionVolume);
