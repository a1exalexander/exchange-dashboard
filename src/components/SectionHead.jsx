import React from 'react';
import { connect } from 'react-redux';
import { fetchParametersUpdate, parametersUpdate } from '../store/actions';
import { formatNumber } from '../utils/format';

const SectionHead = ({ stat, fetchParametersUpdate, parametersUpdate }) => {

  const handleChange = e => {
    const { value } = e.target;
    parametersUpdate(value, 'VOLUME_NUMBER_OF_TRADES');
  };

  const updateValue = (e) => {
    if (e) e.preventDefault()
    fetchParametersUpdate('VOLUME_NUMBER_OF_TRADES');
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      document.getElementById('volume_last').blur();
    }
  }

  return (
    <div className="section">
      <ul className="section__list">
        <li className="section__item">
          <span className="section__value">Price</span>
          <span className="section__value">{formatNumber(stat.price)} USD</span>
        </li>
        <li className="section__item">
          <div className="section__wrapper">
            <span className="section__value">Volume of last</span>
            <input
              id='volume_last'
              type="number"
              value={stat.VOLUME_NUMBER_OF_TRADES}
              onChange={handleChange}
              onKeyUp={handleEnter}
              onBlur={updateValue}
              className="section__input section__input--trades"
            />
            <span className="section__value">trades</span>
          </div>
          <span className="section__value">{formatNumber(stat.volume_of_last)} USD</span>
        </li>
        <li className="section__item">
          <span className="section__value">Open Interest</span>
          <span className="section__value">{formatNumber(stat.open_inerest)} USD</span>
        </li>
      </ul>
    </div>
  );
};

export default connect(({ statModule: { stat } }) => ({ stat }), { parametersUpdate, fetchParametersUpdate })(SectionHead);
