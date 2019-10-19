import React from 'react'

const LevelsResistance = () => {
  return (
    <div className="levels">
      <div className="levels__head">
        <h3 className="levels__title">Resistance</h3>
        <input type="number" placeholder="alert threshold in %" className="levels__input"/>
      </div>
      <div className="levels__inner">
        <div className="levels__col">
          <span className="levels__value">{'8700'}</span>
          <span className="levels__value">{'-4.34'}%</span>
        </div>
        <div className="levels__col">
          <span className="levels__value">{'8700'}</span>
          <span className="levels__value">{'-4.34'}%</span>
        </div>
        <div className="levels__col">
          <span className="levels__value">{'8700'}</span>
          <span className="levels__value">{'-4.34'}%</span>
        </div>
        <div className="levels__col">
          <span className="levels__value">{'8700'}</span>
          <span className="levels__value">{'-4.34'}%</span>
        </div>
      </div>
    </div>
  )
}
export default LevelsResistance;