import { useState } from "react";
//https://redux-toolkit.js.org/tutorials/quick-start
import { useDispatch } from "react-redux";
//https://mui.com/material-ui
import { 
    IconButton, 
    Box, 
    Typography, 
    useTheme, 
    Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";


const Item = ({ item, width }) => {
  const navigate = useNavigate(); //Initialize navigate to the useNavigate function
  const dispatch = useDispatch(); //Initialize dispatch to the useDispatch function
  const [count, setCount] = useState(1); //Represents # of items to add to cart
  const [isHovered, setIsHovered] = useState(false); //Tells us if user is hovering over an item 
  //Grab neutral from theme.js and assign it to palette using useTheme function
  const {
    palette: { neutral }, 
  } = useTheme(); 

  const { category, price, name, image } = item.attributes; // Grab cat, price, name, image  data from attributes
  const {
    data: {
      attributes: {
        formats: {
          medium: { url }, //Grabs the medium sized image from Strapi
        },
      },
    },
  } = image;

  return (  
    //Set Box width to the width of the item
    <Box width={width}> 
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)} //Finds out if mouse is hovered over then it displays the count if true
        onMouseOut={() => setIsHovered(false)} //If mouse is not hovering over item
      >
        <img
          alt={item.name} //Grab the name attribute from the item
          width="300px"
          height="400px"
          src={`http://localhost:1337${url}`} //Basic backend url then use the url we recieved above
          onClick={() => navigate(`/item/${item.id}`)} //Navigate to the item details when clicked on
          style={{ cursor: "pointer" }} 
        />
        <Box
          //Plus and minus signs 
          display={isHovered ? "block" : "none"} //When this box is hovered, it displays the count of the item
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          {/**Flex box for the add and subtract button */}
          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
            >
                {/* Makes sure the count doesn't go below 1 */}
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}> 
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            {/* On click we navigate to the Cart page taking the item and the current count for the cart */}
            <Button
              onClick={() => {
                //Add item to cart
                dispatch(addToCart({ item: { ...item, count } }));
              }}
              //Button styling
              sx={{ backgroundColor: shades.primary[300], color: "white" }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>
      
      <Box mt="3px">
        <Typography variant="subtitle2" color={neutral.dark}>
          {category
            .replace(/([A-Z])/g, " $1") //Takes the categories we created in Strapi and capitalizes the first letter
            .replace(/^./, (str) => str.toUpperCase())}
        </Typography>
        <Typography>{name}</Typography>
        <Typography fontWeight="bold">${price}</Typography>
      </Box>
    </Box>
  );
};

export default Item;
