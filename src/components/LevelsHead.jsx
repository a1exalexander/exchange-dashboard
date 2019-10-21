import React, { useState } from 'react';
import models from '../models';
import { connect } from 'react-redux';
import { fetchLevels } from '../store/actions';

const LevelsHead = ({ fetchLevels }) => {

  const [level, updateLevel] = useState(models.levelParams);

  const handleChange = (type) => (e) => {
    const { value } = e.target;
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
         <div className="levels__select-wrapper">
            <input value={level.timeframe} readOnly placeholder="timeframe" className="levels__input levels__input--like-select"/>
            <select onChange={handleChange('timeframe')} placeholder="timeframe" className="levels__select" value={level.timeframe}>
              <option value="" className='levels__disabled-option'>timeframe</option>
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
          <input onChange={handleChange('candles')} value={level.candles} type="number" placeholder="candles" className="levels__input "/>
        </div>
        <div className="levels__row">
          <input onChange={handleChange('minTouches')} value={level.minTouches} type="number" placeholder="min touches" className="levels__input levels__input--mr"/>
          <input onChange={handleChange('likelinessPercent')} value={level.likelinessPercent} type="number" placeholder="likeliness percent" className="levels__input levels__input--mr"/>
          <input onChange={handleChange('bouncePercent')} value={level.bouncePercent} type="number" placeholder="bounce percent" className="levels__input levels__input--mr"/>
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
