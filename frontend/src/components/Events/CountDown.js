import React, { useEffect, useState } from "react";

const CountDown = ({data}) => {
  const [timeleft, setTimeleft] = useState(calculateTime());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeleft(calculateTime());
    }, 10);

    return () => calculateTime(timer);
  });

  function calculateTime() {
    const diff = +new Date(data?.Finish_Date) - +new Date();

    let timeleft = {};

    if (diff > 0) {
      timeleft = {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    }
    return timeleft;
  }

  const timerComponents = Object.keys(timeleft).map((interval) => {
    if (!timeleft[interval]) {
      return null;
    }
    return (
      <span className="text-[25px] text-[#475ad2]">
        {timeleft[interval]} {interval}{" "}
      </span>
    );
  });
  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px] ">Time's up!</span>
      )}
    </div>
  );
};

export default CountDown;
