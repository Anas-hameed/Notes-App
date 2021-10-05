import React, { useEffect } from 'react';

const Alert = ({ type, msg, setAlert, list }) => {
  useEffect(() => {
    const val = setInterval(() => {
      setAlert({ show: false, type: '', msg: '' });
    }, 3000);
    return () => clearInterval(val);
  }, [list]);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
