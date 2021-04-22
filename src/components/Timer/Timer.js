import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Timer = (props) => {
  const { min, sec } = props;
  const [minutes, setMinutes] = useState(Number(min));
  const [seconds, setSeconds] = useState(Number(sec));
  const [intervalId, setIntervalId] = useState();

  const startTimer = (mins, secs) => {
    clearInterval(intervalId);
    let mins1 = mins;
    let secs1 = secs;
    const kek = setInterval(() => {
      if (secs1 === 0) {
        if (mins1 === 0) {
          clearInterval(intervalId);
          return;
        }
        mins1 -= 1;
        secs1 = 60;
        setSeconds(60);
        setMinutes(mins1);
      }
      setSeconds((old) => old - 1);
      secs1 -= 1;
    }, 1000);
    setIntervalId(kek);
  };

  const stopTimer = () => clearInterval(intervalId);

  return (
    <span className="description">
      <button
        onClick={() => startTimer(minutes, seconds)}
        aria-label="button"
        type="button"
        className="icon icon-play"
      />
      <button onClick={stopTimer} aria-label="button" type="button" className="icon icon-pause" />
      {String(minutes).length === 1 ? `0${minutes}` : minutes}:{String(seconds).length === 2 ? seconds : `0${seconds}`}
    </span>
  );
};

Timer.propTypes = {
  min: PropTypes.string,
  sec: PropTypes.string,
};

Timer.defaultProps = {
  min: 0,
  sec: 0,
};

export default Timer;
