import React from 'react';
import IconPlus from './icons/IconPlus';

const LevelsCustom = () => {
  return (
    <div className="levels">
      <div className="levels__head">
        <h3 className="levels__title">Custom Levels</h3>
        <input type="number" placeholder="alert threshold in %" className="levels__input"/>
      </div>
      <div className="levels__inner levels__inner--custom">
        <div className="levels__wrapper">
          <span className="levels__value levels__value--custom">{'8600'} USD</span>
          <span className="levels__value levels__value--custom">{'-7.32'}%</span>
          <button className="levels__btn"><IconPlus className="levels__icon levels__icon--remove"/></button>
        </div>
        <div className="levels__wrapper">
          <input type="number" placeholder="USD price" className="levels__input levels__input--custom"/>
          <button className="levels__btn"><IconPlus className="levels__icon"/></button>
        </div>
      </div>
    </div>
  )
}
export default LevelsCustom;