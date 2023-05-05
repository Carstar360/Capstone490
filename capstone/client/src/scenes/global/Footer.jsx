import { useTheme } from "@mui/material";
import { shades } from "../../theme";
import { Box, Typography } from "@mui/material";

//Bottom of the homepage
//No functionality just for UI purposes
const Footer = () => {
  const {
    palette: { neutral }, //Found in the theme.js file
  } = useTheme();
  return (
    //This outer box encapsulates the entire footer on each page
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
            Then came the night of the first falling star. It was seen early in
            the morning, rushing over Winchester eastward, a line of flame high
            in the atmosphere. Hundreds must have seen it and taken it for an
            ordinary falling star. It seemed that it fell to earth about one
            hundred miles east of him.
          </div>
        </Box>
        {/* This box encappsulates the "About us" section of the footer
            Not functional currently but for UI purposes */}
        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            About us
          </Typography>
          <Typography mb="30px">History</Typography>
          <Typography mb="30px">Store Locations</Typography>
          <Typography mb="30px">Career Opportunities</Typography>
          <Typography mb="30px">Terms & Conditions</Typography>
        </Box>

        {/* Center footer info at the bottom of each page 
            Focuses primarily on customer suppport
            Add support chat functionality */}
        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Customer Care
          </Typography>
          <Typography mb="30px">Support Chat</Typography>
          <Typography mb="30px">Email Us</Typography>
          <Typography mb="30px">Call Us</Typography>
          <Typography mb="30px">FAQ</Typography>
        </Box>

        {/* Box created that holds the contact info for the site */}
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
