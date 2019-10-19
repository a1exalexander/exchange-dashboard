import React from "react";

const SectionVolume = () => {
  return (
    <div className="section section--last">
      <ul className="section__list">
        <li className="section__item">
          <span className="section__value">1m USD Volume Change</span>
          <div className="section__wrapper">
            <span className="section__value">{`${"+54965"} USD (${+147.54}%)`}</span>
            <input
              type="text"
              placeholder="alert threshold in %"
              className="section__input section__input--level"
            />
          </div>
        </li>
        <li className="section__item">
          <span className="section__value">5m USD Volume Change</span>
          <div className="section__wrapper">
            <span className="section__value">{`${"+54965"} USD (${+147.54}%)`}</span>
            <input
              type="text"
              placeholder="alert threshold in %"
              className="section__input section__input--level"
            />
          </div>
        </li>
        <li className="section__item">
          <span className="section__value">1h USD Volume Change</span>
          <div className="section__wrapper">
            <span className="section__value">{`${"+54965"} USD (${+147.54}%)`}</span>
            <input
              type="text"
              placeholder="alert threshold in %"
              className="section__input section__input--level"
            />
          </div>
        </li>
        <li className="section__item">
          <span className="section__value">1d USD Volume Change</span>
          <div className="section__wrapper">
            <span className="section__value">{`${"+54965"} USD (${+147.54}%)`}</span>
            <input
              type="text"
              placeholder="alert threshold in %"
              className="section__input section__input--level"
            />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SectionVolume;
