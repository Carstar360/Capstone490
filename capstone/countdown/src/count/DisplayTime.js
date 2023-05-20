//https://legacy.reactjs.org/docs/getting-started.html
import React from 'react';

//Function to display the time on the page
const DisplayTime = ({ val, type }) => {
  return (
    //If there's an error then it will use error CSS or vice versa
    <div className={'countdown'}>
      {/**The string on top is displayed here*/}
      <p>{val}</p>
      {/** the lesser string underneath is displayed here */}
      <span>{type}</span>
    </div>
  );
};

//Export this file to rest of app
export default DisplayTime;
