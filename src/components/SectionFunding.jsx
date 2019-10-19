import React from "react";

const SectionFunding = () => {
  return (
    <div className="section">
      <ul className="section__list">
        <li className="section__item">
          <span className="section__value">Current Funding Rate</span>
          <span className="section__value">{`${"0.0857"}% (${+17.4}%, ${+5.4} bps)`}</span>
        </li>
        <li className="section__item">
          <span className="section__value">Predicted Funding Rate</span>
          <span className="section__value">{`${-0.0857}% (${-17.4}%, ${-5.4} bps)`}</span>
        </li>
        <li className="section__item">
          <span className="section__value">Next Funding Rate Change at</span>
          <span className="section__value">{'2019-10-19 02:00:00 UTC'}</span>
        </li>
      </ul>
    </div>
  );
};

export default SectionFunding;
