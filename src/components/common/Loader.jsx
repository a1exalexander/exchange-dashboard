import React from 'react';
import { connect } from 'react-redux';

const Loader = ({ store }) => {

  const { levelsModule, statModule, parametersModule, thresholdsModule } = store;

  const loading = [levelsModule.loading, statModule.loading, parametersModule.loading, thresholdsModule.loading].includes(true);
  
  if (!loading) {
    return null;
  }
  return (
    <div className='loader fadeIn'><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
  )
}

export default connect(
  (store) => ({ store })
)(Loader);
