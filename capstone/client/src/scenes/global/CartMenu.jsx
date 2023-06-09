//https://mui.com/material-ui/getting-started/installation/
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
//https://redux-toolkit.js.org/tutorials/quick-start
import { useSelector, useDispatch } from "react-redux";
//https://mui.com/material-ui/material-icons/
import CloseIcon from "@mui/icons-material/Close";
//https://mui.com/material-ui/material-icons/
import AddIcon from "@mui/icons-material/Add";
//https://mui.com/material-ui/material-icons/
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../../state";

//https://reactrouter.com/en/main/hooks/use-navigate
import { useNavigate } from "react-router-dom"; //Used to navigate through each page

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
//Navigate a way to the checkout page
const CartMenu = () => {
  //https://reactrouter.com/en/main/hooks/use-navigate
  const navigate = useNavigate(); //Assign useNavigate function to navigate
  const dispatch = useDispatch(); //Assign useDispatch function to dispatch
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price;
  }, 0);

  return (
    //https://mui.com/material-ui/react-box/
    <Box
      display={isCartOpen ? "block" : "none"}
      backgroundColor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      {/**https://mui.com/material-ui/react-box/ */}
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px, 30%)"
        height="100%"
        backgroundColor="white"
      >
        {/**https://mui.com/material-ui/react-box/ */}
        <Box padding="30px" overflow="auto" height="100%">
          {/* HEADER */}
          <FlexBox mb="15px">
            <Typography variant="h3"> SHOPPING BAG ({cart.length})</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}> {/* Open the cart when clicked */}
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* CART LIST */}
          <Box>
            {cart.map((item) => (
                //We identify the name then format the item object
              <Box key={`${item.attributes.name}-${item.id}`}>
                <FlexBox p="15px 0"> {/* 15px padding on top and 0 on sides*/}
                  <Box flex="1 1 40%">
                    <img
                      alt={item?.name}
                      width="123px"
                      height="164px"
                      src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                    /> {/* Get the info from Strapi using this url */}
                  </Box>
                  <Box flex="1 1 60%">
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold">
                        {item.attributes.name}
                      </Typography>
                      {/* Remove item from the cart using a filter function "Dispatch" */}
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromCart({ id: item.id }))
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                    {/* Print the short description from Strapi that the specific item has */}
                    <Typography>{item.attributes.shortDescription}</Typography>
                    <FlexBox m="15px 0">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid ${shades.neutral[500]}`}
                      > {/* Create button that calls the decreaseCount on the current cart */}
                        <IconButton
                          onClick={() =>
                            dispatch(decreaseCount({ id: item.id }))
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.count}</Typography>
                        {/* Create button that calls increaseCount when we add an item to cart*/}
                        <IconButton
                          onClick={() =>
                            dispatch(increaseCount({ id: item.id }))
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      {/* Display the price of each item from Strapi */}
                      <Typography fontWeight="bold">
                        ${item.attributes.price}
                      </Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>

          {/* ACTIONS */}
          <Box m="20px 0">
            <FlexBox m="20px 0">
              <Typography fontWeight="bold">SUBTOTAL</Typography>
              <Typography fontWeight="bold">${totalPrice}</Typography>
            </FlexBox>
            {/* When we press this button it takes us to the checkout menu 
                and will close the current cart menu */}
            <Button
              sx={{
                backgroundColor: shades.primary[400],
                color: "white",
                borderRadius: 0,
                minWidth: "100%",
                padding: "20px 40px",
                m: "20px 0",
              }}
              onClick={() => {
                navigate("/checkout");
                dispatch(setIsCartOpen({}));
              }}
            >
              CHECKOUT
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;
