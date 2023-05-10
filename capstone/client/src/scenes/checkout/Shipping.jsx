//https://mui.com/material-ui/getting-started/installation/
//https://mui.com/material-ui/react-box/
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import AddressForm from "./AddressForm";

//Create the Shipping object for Formik that holds all the values
//Needed for the checkout form
const Shipping = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  setFieldValue,
}) => {
  return (
    <Box m="30px auto">
      <Box>
        <Typography sx={{ mb: "15px" }} fontSize="18px">
          Billing Information
        </Typography>
        {/** Form for the billing address */}
        <AddressForm
          type="billingAddress"
          //Keeps track of the value the user types in
          values={values.billingAddress}
          //Designates whether the field is clicked on
          //Boolean
          touched={touched}
          //Empty unless there is an error
          errors={errors}
          //Handles when you click on the box and click out of the box
          handleBlur={handleBlur}
          //Values get chanegd when the user types in the form
          handleChange={handleChange}
        />
      </Box>

      <Box mb="20px">
        <FormControlLabel
          control={
            <Checkbox
            //Box is automatically checked by default
              defaultChecked
              value={values.shippingAddress.isSameAddress}
              onChange={() =>
                //Changes value of the field inside Formik manually
                setFieldValue(
                  "shippingAddress.isSameAddress",
                  //Flips the boolean either way
                  //From checked to unchecked and vice versa
                  !values.shippingAddress.isSameAddress
                )
              }
            />
          }
          label="Same for Shipping Address"
        />
      </Box>
          {/** Form for the Shipping Address
           * If sameAddress box is unchecked
           */}
      {!values.shippingAddress.isSameAddress && (
        <Box>
          <Typography sx={{ mb: "15px" }} fontSize="18px">
            Shipping Information
          </Typography>
          <AddressForm
            type="shippingAddress"
            //Keeps track of the value the user types in
            values={values.shippingAddress}
            //Designates whether the field is clicked on
            //Boolean
            touched={touched}
            //Empty unless there is an error
            errors={errors}
            //Handles when you click on the box and click out of the box
            handleBlur={handleBlur}
            //Values get chanegd when the user types in the form
            handleChange={handleChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default Shipping;
