import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchParameters, fetchThresholds, wsConnect } from '../store/actions';
import SectionHead from '../components/SectionHead';

const App = ({ fetchParameters, fetchThresholds, wsConnect }) => {

  useEffect(() => {
    // wsConnect();
    fetchParameters();
    fetchThresholds();
  }, [])

  return (
    <div className="app">
      <div className="app__container">
        <h1>Dahsboard</h1>
        <SectionHead/>
      </div>
    </div>
  );
}

export default connect(
  null,
  { wsConnect, fetchThresholds, fetchParameters }
)(App);
