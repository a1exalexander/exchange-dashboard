import React, { useState } from 'react';
import models from '../models';
import { connect } from 'react-redux';
import { fetchLevels, updateTimeframe } from '../store/actions';

const LevelsHead = ({ updateTimeframe, fetchLevels }) => {
  const timeframes = [
    [1, '1m'],
    [3, '3m'],
    [5, '5m'],
    [15, '15m'],
    [30, '30m'],
    [45, '45m'],
    [60, '1h'],
    [120, '2h'],
    [180, '3h'],
    [240, '4h'],
    ['D', 'D'],
    ['W', 'W'],
    ['M', 'M']
  ];

  const [level, updateLevel] = useState(models.levelParams);

  const handleChange = type => e => {
    const value = type === 'candles' ? Number(e.target.value) : e.target.value;
    updateLevel({ ...level, [type]: value });
    if (type === 'timeframe') updateTimeframe(value);
  };

  const update = async e => {
    e.preventDefault();
    fetchLevels(level);
    return;
  };

  return (
    <div className="levels">
      <form>
        <div className="levels__row">
          <div className="levels__input-wrapper">
            <label className="levels__label" htmlFor="timeframe">
              Timeframe
            </label>
            <div className="levels__select-wrapper">
              <input
                value={level.timeframe}
                readOnly
                placeholder="timeframe"
                className="levels__input levels__input--like-select"
              />
              <select
                id="timeframe"
                onChange={handleChange('timeframe')}
                placeholder="timeframe"
                className="levels__select"
                value={level.timeframe}
              >
                {timeframes.map(([val, label], idx) => {
                  return (
                    <option key={idx} value={val}>
                      {label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="levels__input-wrapper">
            <label className="levels__label" htmlFor="candles">
              Candles
            </label>
            <input
              id="candles"
              onChange={handleChange('candles')}
              value={level.candles}
              type="number"
              placeholder="candles"
              className="levels__input "
            />
          </div>
        </div>
        <div className="levels__row">
          <div className="levels__input-wrapper">
            <label className="levels__label" htmlFor="min_touches">
              Min touches
            </label>
            <input
              id="min_touches"
              onChange={handleChange('minTouches')}
              value={level.minTouches}
              type="number"
              placeholder="min touches"
              className="levels__input"
            />
          </div>
          <div className="levels__input-wrapper">
            <label className="levels__label" htmlFor="likeliness">
              Likeliness percent
            </label>
            <input
              id="likeliness"
              onChange={handleChange('likelinessPercent')}
              value={level.likelinessPercent}
              type="number"
              placeholder="likeliness percent"
              className="levels__input"
            />
          </div>
          <div className="levels__input-wrapper">
            <label className="levels__label" htmlFor="bounce">
              Bounce percent
            </label>
            <input
              id="bounce"
              onChange={handleChange('bouncePercent')}
              value={level.bouncePercent}
              type="number"
              placeholder="bounce percent"
              className="levels__input"
            />
          </div>
          <button onClick={update} className="levels__submit" type="submit">
            update
          </button>
        </div>
      </form>
    </div>
  );
};

export default connect(
  null,
  { fetchLevels, updateTimeframe }
)(LevelsHead);
