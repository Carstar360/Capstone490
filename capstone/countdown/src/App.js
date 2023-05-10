import React from "react";
import CountdownTimer from "./count/CountdownTimer";

import "./App.css";

export default function App() {
  const timeLeft = 1 * 7 * 60 * 60 * 1000;
  const todayDate = new Date().getTime();

  const end = todayDate + timeLeft;

  return (
    <div>
      <h1>Time until Release</h1>
      <CountdownTimer targetDate={end} />
      <div class="container">
        <div class="center">
          <button>Enter waiting room!</button>
        </div>
      </div>
    </div>
  );
}
