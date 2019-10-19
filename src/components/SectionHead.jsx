import React from "react";

const SectionHead = () => {
  return (
    <div className="section">
      <ul className="section__list">
        <li className="section__item">
          <span className="section__value">Price</span>
          <span className="section__value">{"7.954"} USD</span>
        </li>
        <li className="section__item">
          <div className="section__wrapper">
            <span className="section__value">Volume of last</span>
            <input type="number" placeholder="5" className="section__input section__input--trades" />
            <span className="section__value">trades</span>
          </div>
          <span className="section__value">{"7.954"} USD</span>
        </li>
        <li className="section__item">
          <span className="section__value">Open Interest</span>
          <span className="section__value">{"7.954"} USD</span>
        </li>
      </ul>
    </div>
  );
};

export default SectionHead;
