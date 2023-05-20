//https://mui.com/material-ui/getting-started/installation/
import { useTheme } from "@mui/material";
import { shades } from "../../theme";
//{/**https://mui.com/material-ui/ */}
import { Box, Typography, Button } from "@mui/material";

//Bottom of the homepage
//No functionality just for UI purposes
const Footer = () => {
  const {
    palette: { neutral }, //Found in the theme.js file
  } = useTheme();
  return (
    //This outer box encapsulates the entire footer on each page
    //**https://mui.com/material-ui/react-box/ 
    <Box mt="70px" p="40px 0" backgroundColor={neutral.light}>
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20%, 30%, 40%"
      >
        {/* This box encapsulates the name on the site as well as a shortdescription */}
        {/**https://mui.com/material-ui/react-box/ */}
        <Box width="clamp(20%, 30%, 40%)">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary}
          >
            SNKRS APP
          </Typography>
          <div>
            Over time, SNKR APP has become one of the most well-known and
            respected shoe websites in the world. They continued to innovate and
            adapt, always staying one step ahead of their competitors. And while
            they may have started as a small family business, they had become a
            global leader in the shoe industry, all thanks to their dedication
            to quality, customer service, and a love of shoes.
          </div>
        </Box>
        {/* This box encappsulates the "About us" section of the footer
            Not functional currently but for UI purposes */}
        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            About us
          </Typography>
          <Typography mb="15px">
            <Button>History</Button>
          </Typography>
          <Typography mb="15px">
            <Button>Store Locations</Button>
          </Typography>
          <Typography mb="15px">
            <Button>Career Opportunities</Button>
          </Typography>
          <Typography mb="15px">
            <Button>Terms & Conditions</Button>
          </Typography>
        </Box>

        {/* Center footer info at the bottom of each page 
            Focuses primarily on customer suppport
            Add support chat functionality */}
            {/**https://mui.com/material-ui/react-box/ */}
        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Customer Care
          </Typography>
          <Typography mb="15px">
            <Button
              onClick={event =>  window.location.href='http://localhost:3002'} 
            >Support Chat</Button>
          </Typography>
          <Typography mb="15px">
            <Button>Email Us</Button>
          </Typography>
          <Typography mb="15px">
            <Button>Call Us</Button>
          </Typography>
          <Typography mb="15px">
            <Button>FAQ</Button>
          </Typography>
        </Box>

        {/* Box created that holds the contact info for the site */}
        {/**https://mui.com/material-ui/react-box/ */}
        <Box width="clamp(20%, 25%, 30%)">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Contact Info
          </Typography>
          <Typography mb="30px">1000 W Sacramento Ave</Typography>
          <Typography mb="30px">Email: carstar360@hotmail.com</Typography>
          <Typography mb="30px">Phone: (707)-297-2890</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
