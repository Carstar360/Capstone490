//https://mui.com/material-ui/react-box/
import { Box, InputBase, Divider, Typography, IconButton } from "@mui/material";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import { useState } from "react";

const Subscribe = () => {
  const [email, setEmail] = useState(""); //Update the email var using setEmail 
                                            //Starts initially blank then use useState to update

  return (
    //Styling for the box that has the subscription button
    <Box width="80%" margin="80px auto" textAlign="center">
      <IconButton>
        <MarkEmailReadOutlinedIcon fontSize="large" />
      </IconButton>
      {/* Main text above the email fill out form  */}
      <Typography variant="h3">Subscribe To Our Newsletter</Typography>
      <Typography>and get all the latest updates on upcoming drops!</Typography>
      {/** Styling for the box which holds all the css below the text */}
      <Box
        p="2px 4px"
        m="15px auto"
        display="flex"
        alignItems="center"
        width="75%"
        backgroundColor="#F2F2F2"
      >
        {/* Box that allows you to input the email you wish to sign up with */}
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          //"Enter email" inside the input box to direct the customer
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        {/* Makeshift button to subscribe to the newsletter */}
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        {/* "Subscribe text inserted to guide the user" */}
        <Typography sx={{ p: "10px", ":hover": { cursor: "pointer" } }}>
          Subscribe
        </Typography>
      </Box>
    </Box>
  );
};

export default Subscribe;
