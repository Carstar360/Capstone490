//https://legacy.reactjs.org/docs/hooks-effect.html
//https://legacy.reactjs.org/docs/hooks-state.html
import { useEffect, useState } from 'react';

//Main function to grab the target date we provide then calculate the time remaining 
//Using the calc function underneath
//https://usehooks-ts.com/react-hook/use-countdown
const useCountdown = (targetDate) => {
  //https://www.w3schools.com/jsref/jsref_gettime.asp
  //Create a countDownDate var that is passed in the date entered into the system as targetDate
  const countDownDate = new Date(targetDate).getTime();

  //https://legacy.reactjs.org/docs/hooks-state.html
  //Create a countDown var that useState to set countDown as the date grabbed above minus the current time
  const [countDown, setCountDown] = useState(
    //https://www.w3schools.com/jsref/jsref_gettime.asp
    countDownDate - new Date().getTime()
  );
  ////https://legacy.reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    //https://www.w3schools.com/jsref/met_win_clearinterval.asp
    //Create a interval var that sets the interval to appear on screen as the countDown date minus
    //the current time
    //This interval is then reset after 
    const interval = setInterval(() => {
      //https://www.w3schools.com/jsref/jsref_gettime.asp
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);
    //https://www.w3schools.com/jsref/met_win_clearinterval.asp
    return () => clearInterval(interval);
  }, [countDownDate]);
  //Return the Calculated time 
  return calc(countDown);
};

//Calc function that takes in var countDown
const calc = (countDown) => {
  // calculate time left
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
  //Return the calculated days, hours, mins, secs
  return [days, hours, minutes, seconds];
};

//https://usehooks-ts.com/react-hook/use-countdown
//Export the data we calc'd 
export { useCountdown };
