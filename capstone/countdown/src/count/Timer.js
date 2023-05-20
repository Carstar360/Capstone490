import React from "react";
//https://usehooks-ts.com/react-hook/use-countdown
import { useCountdown } from "./useCountdown";
//Reference file 
import DisplayTime from "./DisplayTime";

//Timer var that uses the useCountdown func we made earlier to calc the time 
//Assign to Timer
const Timer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  //If calc time less than 0 then display that the shoes have dropped
  //Which also displays a button to buy the shoes
  if (days + hours + minutes + seconds <= 0) {
    return <ShoeDrop />;
  } else {
    //If the time is above 0 then display it 
    return (
      <ShowCounter
        //ShowCOunter takes in 4 params which will be displayed
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

// Shoe drop function that displays when the timer is past 0
const ShoeDrop = () => {
  return (
    <div className="shoe-drop">
      {/** Text saying the shoes have dropped
       * with a button underneath that allows you to reserve your pair
       * Not iimplemented currently
       */}
      <p>Shoes have dropped!</p>
      <button>Reserve yours now!</button>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    //Uses show-counter css in this space
    <div className="show-counter">
      {/** CSS for the timer
       * Displays it horiizontally rather than vertical
       */}
      <a
        href="www.google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="countdown-link"
      >
        {/** Display the days on the far left
         * followed by hours, mins, sec 
         */}
        <DisplayTime val={days} type={"Days"} />
        <p>:</p>
        <DisplayTime val={hours} type={"Hours"} />
        <p>:</p>
        <DisplayTime val={minutes} type={"Mins"} />
        <p>:</p>
        <DisplayTime val={seconds} type={"Seconds"} />
      </a>
    </div>
  );
};

export default Timer;
