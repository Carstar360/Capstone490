//https://mui.com/material-ui/getting-started/installation/
//https://mui.com/material-ui/react-use-media-query/
//https://mui.com/material-ui/react-box/
import { Box, useMediaQuery, TextField } from "@mui/material";
import { getIn } from "formik";

//https://formik.org/docs/overview#installation

const AddressForm = ({
  type,
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
}) => {
  //https://mui.com/material-ui/react-use-media-query/
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Functions that allow the code to be read easier
  //Formats the name with just the field 
  const formattedName = (field) => `${type}.${field}`;

  //Grabs a boolean that checks the touched object to see if
  //formattedName(field) is true or false
  //getIn() is used because formik requires it when nesting 
  //an object in formik
  //Tells us if both are true then no error 
  //If either false then gives error
  const formattedError = (field) =>
    Boolean(
      getIn(touched, formattedName(field)) &&
        getIn(errors, formattedName(field))
    );

    //Function that uses the above function, if there's an error
    //It shows what the error is
  const formattedHelper = (field) =>
    getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

  return (
    //Box for the address form during checkout
    <Box
      display="grid"
      gap="15px"
      //Split into 4 fractions with a min of 0 max of 4
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      //Only if mobile
      //Formats the address form so each field moves down 
      //and takes up the whole screen
      sx={{
        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
      }}
    >
      <TextField
        fullWidth
        type="text"
        //Show first name in the text box
        label="First Name"
        //Handles clicking on and off the box
        onBlur={handleBlur}
        //handles what you type into the field
        onChange={handleChange}
        //Whatever you type becomes the value
        value={values.firstName}
        name={formattedName("firstName")} //Helps eveything fit on one line
        error={formattedError("firstName")}
        helperText={formattedHelper("firstName")}
        //Formats the amount of boxes you can put on one desktop
        //2 can fit side by side per screen so one box is half the screen
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        type="text"
        label="Last Name"
        //Handles clicking on and off the specific box for Last name
        onBlur={handleBlur}
        //handles what you type into the field
        onChange={handleChange}
        //The value becomes whatever is typed in the last name box
        value={values.lastName}
        name={formattedName("lastName")}
        error={formattedError("lastName")}
        helperText={formattedHelper("lastName")}
        //Formats the amount of boxes you can put on one desktop
        //2 can fit side by side per screen so one box is half the screen
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        type="text"
        label="Country"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.country}
        name={formattedName("country")}
        error={formattedError("country")}
        helperText={formattedHelper("country")}
        //Formats the amount of boxes you can put on one desktop
        //This box is the whole screen wide
        sx={{ gridColumn: "span 4" }}
      />
      <TextField
        fullWidth
        type="text"
        label="Street Address"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.street1}
        name={formattedName("street1")}
        error={formattedError("street1")}
        helperText={formattedHelper("street1")}
        //Formats the amount of boxes you can put on one desktop
        //2 can fit side by side per screen so one box is half the screen
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        type="text"
        label="Street Address 2 (optional)"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.street2}
        name={formattedName("street2")}
        error={formattedError("street2")}
        helperText={formattedHelper("street2")}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        type="text"
        label="City"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.city}
        name={formattedName("city")}
        error={formattedError("city")}
        helperText={formattedHelper("city")}
        //Formats the amount of boxes you can put on one desktop
        //2 can fit side by side per screen so one box is half the screen
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        type="text"
        label="State"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.state}
        name={formattedName("state")}
        error={formattedError("state")}
        helperText={formattedHelper("state")}
        //Formats the amount of boxes you can put on one desktop
        //2 can fit side by side per screen so one box is a fourth of the screen
        sx={{ gridColumn: "1fr" }}
      />
      <TextField
        fullWidth
        type="text"
        label="Zip Code"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.zipCode}
        name={formattedName("zipCode")}
        error={formattedError("zipCode")}
        helperText={formattedHelper("zipCode")}
        //Formats the amount of boxes you can put on one desktop
        //2 can fit side by side per screen so one box is a fourth of the screen
        sx={{ gridColumn: "1fr" }}
      />
    </Box>
  );
};
export default AddressForm;