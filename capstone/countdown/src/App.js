//https://legacy.reactjs.org/docs/getting-started.html
import React from "react";
//Reference file
import Timer from "./count/Timer";

import "./App.css";

//Standard function for the app 
export default function App() {
  //Calculates the time remaining until the drop
  //This is where we set the time remaining on the page
  //Set 1 to 0 to see the dropped page
  const timeLeft = 1 * 7 * 60 * 60 * 1060;
  //Grabs the current time
  const todayDate = new Date().getTime();
  //Add current time to timeLeft to get the drop time
  const end = todayDate + timeLeft;

  return (
    <div>
      {/** Display this info on the front page 
       * with the timer underneath the text
      */}
      <h1>Time until Release</h1>
      <Timer targetDate={end} />
    </div>
  );
}
