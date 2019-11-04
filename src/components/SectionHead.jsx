import React from 'react';
import { connect } from 'react-redux';
import { fetchParametersUpdate, parametersUpdate } from '../store/actions';
import { formatNumber } from '../utils/format';

const SectionHead = ({ stat, fetchParametersUpdate, parametersUpdate }) => {

  const handleChange = (type) => (e) => {
    const { value } = e.target;
    parametersUpdate(value, type);
  };

  const updateValue = (type) => (e) => {
    if (e) e.preventDefault()
    fetchParametersUpdate(type);
  };

  const handleEnter = (id) => (e) => {
    if (e.key === 'Enter') {
      document.getElementById(id).blur();
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
              id='VOLUME_NUMBER_OF_TRADES'
              type="number"
              value={stat.VOLUME_NUMBER_OF_TRADES}
              onChange={handleChange('VOLUME_NUMBER_OF_TRADES')}
              onKeyUp={handleEnter('VOLUME_NUMBER_OF_TRADES')}
              onBlur={updateValue('VOLUME_NUMBER_OF_TRADES')}
              className="section__input section__input--trades"
            />
            <span className="section__value">trades</span>
          </div>
          <span className="section__value">{formatNumber(stat.volume_of_last)} USD</span>
        </li>
        <li className="section__item">
          <div className="section__wrapper">
            <span className="section__value">Open Interest</span>
            <input
              id='OPEN_INTEREST'
              type="number"
              value={stat.OPEN_INTEREST}
              onChange={handleChange('OPEN_INTEREST')}
              onKeyUp={handleEnter('OPEN_INTEREST')}
              onBlur={updateValue('OPEN_INTEREST')}
              className="section__input section__input--trades"
            />
          </div>
          <span className="section__value">{formatNumber(stat.open_inerest)} USD</span>
        </li>
      </ul>
    </div>
  );
};

export default connect(({ statModule: { stat } }) => ({ stat }), { parametersUpdate, fetchParametersUpdate })(SectionHead);
