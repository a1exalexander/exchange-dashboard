import React, { useState } from 'react';
import { connect } from 'react-redux';
import { customLevelAdd, customLevelRemove } from '../store/actions';
import IconPlus from './icons/IconPlus';
import models from '../models';
import { formatNumber } from '../utils/format';
import { getDistanceLevels } from '../store/getters';

const LevelsCustom = ({ customLevelAdd, customLevelRemove, levels }) => {
  
  const [newLevel, updateNewLevel] = useState(models.level);

  const handleChange = e => {
    const { value: price } = e.target;
    updateNewLevel({ ...newLevel, price });
  };

  const addLevel = async () => {
    const ok = await customLevelAdd(newLevel);
    if (ok) updateNewLevel(models.level);
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      addLevel();
    }
  }

  const levelsList = levels.map(({ idx, price, distance }) => {
    return (
      <li className="levels__item" key={idx}>
        <span className="levels__value levels__value--custom">
          {formatNumber(price)} USD
        </span>
        <span className="levels__value levels__value--custom">
          {distance || 0}%
        </span>
        <button onClick={() => customLevelRemove({ idx, price })} className="levels__btn">
          <IconPlus className="levels__icon levels__icon--remove" />
        </button>
      </li>
    );
  });

  return (
    <div className="levels">
      <div className="levels__head">
        <h3 className="levels__title">Custom Levels</h3>
        <input
          type="number"
          placeholder="alert threshold in %"
          className="levels__input"
        />
      </div>
      <div className="levels__inner levels__inner--custom">
        <ul className="levels__list">{levelsList}</ul>
        <div className="levels__item">
          <input
            onKeyUp={handleEnter}
            value={newLevel.price}
            onChange={handleChange}
            type="number"
            placeholder="USD price"
            className="levels__input levels__input--custom"
          />
          <button onClick={addLevel} className="levels__btn">
            <IconPlus className="levels__icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect(
  (store) => ({ levels: getDistanceLevels(store)(store.levelsModule.custom) }),
  { customLevelAdd, customLevelRemove }
)(LevelsCustom);
