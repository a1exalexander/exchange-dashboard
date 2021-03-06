import React, { useState } from 'react';
import models from '../models';
import { connect } from 'react-redux';
import { fetchLevels } from '../store/actions';

const LevelsHead = ({ fetchLevels, timeframes }) => {

  const [level, updateLevel] = useState(models.levelParams);

  const handleChange = (type) => (e) => {
    const value = type === 'candles' ? Number(e.target.value) : e.target.value;
    updateLevel({ ...level, [type]: value });
  }

  const update = async (e) => {
    e.preventDefault();
    fetchLevels(level);
    return;
  }

  return (
    <div className="levels">
      <form>
        <div className="levels__row">
         <div className='levels__input-wrapper'>
           <label className="levels__label" htmlFor="timeframe">Timeframe</label>
           <div className="levels__select-wrapper">
              <input value={level.timeframe} readOnly placeholder="timeframe" className="levels__input levels__input--like-select"/>
              <select id='timeframe' onChange={handleChange('timeframe')} placeholder="timeframe" className="levels__select" value={level.timeframe}>
                { timeframes.split(',').map((el, idx) => {
                  return <option key={idx} value={el}>{el}</option>
                }) }
              </select>
           </div>
         </div>
          <div className='levels__input-wrapper'>
            <label className="levels__label" htmlFor="candles">Candles</label>
            <input id='candles' onChange={handleChange('candles')} value={level.candles} type="number" placeholder="candles" className="levels__input "/>
          </div>
        </div>
        <div className="levels__row">
          <div className='levels__input-wrapper'>
            <label className="levels__label" htmlFor="min_touches">Min touches</label>
            <input id='min_touches' onChange={handleChange('minTouches')} value={level.minTouches} type="number" placeholder="min touches" className="levels__input"/>
          </div>
          <div className='levels__input-wrapper'>
            <label className="levels__label" htmlFor="likeliness">Likeliness percent</label>
            <input id='likeliness' onChange={handleChange('likelinessPercent')} value={level.likelinessPercent} type="number" placeholder="likeliness percent" className="levels__input"/>
          </div>
          <div className='levels__input-wrapper'>
            <label className="levels__label" htmlFor="bounce">Bounce percent</label>
            <input id='bounce' onChange={handleChange('bouncePercent')} value={level.bouncePercent} type="number" placeholder="bounce percent" className="levels__input"/>
          </div>
          <button onClick={update} className="levels__submit" type="submit">update</button>
        </div>
      </form>
    </div>
  )
};

export default connect(
  ({ statModule: { stat } }) => ({ timeframes: stat.TIMEFRAMES }),
  { fetchLevels }
)(LevelsHead);
