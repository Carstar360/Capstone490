//https://mui.com/material-ui/react-box/
import { Box, Typography, TextField } from "@mui/material";

const Payment = ({ values, touched, errors, handleBlur, handleChange}) => {
    return (
        <Box m="30px 0">
        <Box>
          <Typography sx={{ mb: "15px" }} fontSize="18px">
            Contact Info
          </Typography>
          {/** Text field for our email insertion
           * Passes in the formik values into material UI values
           */}
          <TextField
            //Full width of the screen
            fullWidth
            //Text Box
            type="text"
            //Label to indicate it's for email
            label="Email"
            //Handle clicking on and off of the box
            onBlur={handleBlur}
            //Handle changing the values to whatever is typed
            onChange={handleChange}
            //Assign values.email (Formik) to MUI value
            value={values.email}
            name="email"
            //Converts the value to a boolean
            error={!!touched.email && !!errors.email}
            helperText={touched.email && errors.email}
            //Box takes up the whole screen in width
            //15px space from bottom
            sx={{ gridColumn: "span 4", marginBottom: "15px" }}
          />
          {/** Text field for our phone number insertion
           * Passes in the formik values into material UI values
           */}
          <TextField
            //Full width of the screen
            fullWidth
            //Text box
            type="text"
            //Indicates it's for the phone number
            label="Phone Number"
            //Handle clicking on and off of the box
            onBlur={handleBlur}
            //Handle changing the values to whatever is typed
            onChange={handleChange}
            //Assign value to the number typed
            value={values.phoneNumber}
            name="phoneNumber"
            //Converts the value to a boolean
            error={!!touched.phoneNumber && !!errors.phoneNumber}
            helperText={touched.phoneNumber && errors.phoneNumber}
            //Box takes up the whole screen in width
            sx={{ gridColumn: "span 4" }}
          />
        </Box>
      </Box>
    );
};

export default Payment;