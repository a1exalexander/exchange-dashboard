import React, { useState } from 'react';
import models from '../models';
import { connect } from 'react-redux';
import { fetchLevels } from '../store/actions';

const LevelsHead = ({ fetchLevels }) => {

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
                <option value="1m">1m</option>
                <option value="5m">5m</option>
                <option value="15m">15m</option>
                <option value="30m">30m</option>
                <option value="1h">1h</option>
                <option value="3h">3h</option>
                <option value="6h">6h</option>
                <option value="12h">12h</option>
                <option value="1d">1d</option>
                <option value="1w">1w</option>
                <option value="2w">2w</option>
                <option value="1m">1m</option>
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
            <input id='min_touches' onChange={handleChange('minTouches')} value={level.minTouches} type="number" placeholder="min touches" className="levels__input levels__input--mr"/>
          </div>
          <div className='levels__input-wrapper'>
            <label className="levels__label" htmlFor="likeliness">Likeliness percent</label>
            <input id='likeliness' onChange={handleChange('likelinessPercent')} value={level.likelinessPercent} type="number" placeholder="likeliness percent" className="levels__input levels__input--mr"/>
          </div>
          <div className='levels__input-wrapper'>
            <label className="levels__label" htmlFor="bounce">Bounce percent</label>
            <input id='bounce' onChange={handleChange('bouncePercent')} value={level.bouncePercent} type="number" placeholder="bounce percent" className="levels__input levels__input--mr"/>
          </div>
          <button onClick={update} className="levels__submit" type="submit">update</button>
        </div>
      </form>
    </div>
  )
};

export default connect(
  null,
  { fetchLevels }
)(LevelsHead);
