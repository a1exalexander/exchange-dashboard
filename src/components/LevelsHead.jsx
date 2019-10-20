import React from 'react'

const LevelsHead = () => {

  return (
    <div className="levels">
      <form>
        <div className="levels__row">
          <input type="number" placeholder="timeframe" className="levels__input levels__input--mr"/>
          <input type="number" placeholder="candles" className="levels__input "/>
        </div>
        <div className="levels__row">
          <input type="number" placeholder="min touches" className="levels__input levels__input--mr"/>
          <input type="number" placeholder="likeliness percent" className="levels__input levels__input--mr"/>
          <input type="number" placeholder="bounce percent" className="levels__input levels__input--mr"/>
          <button onClick={(e) => e.preventDefault()} className="levels__submit" type="submit">update</button>
        </div>
      </form>
    </div>
  )
};

export default LevelsHead;