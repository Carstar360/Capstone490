import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Tabs, Tab, Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useParams } from "react-router-dom";
import Item from "../../components/Item";

const ItemDetails = () => {
  const dispatch = useDispatch(); //Initialize dispatch to the useDispatch function to traverse each page
  const { itemId } = useParams(); //Uses useParams to grab the itemId and initialize it
  //To itemId (App.js Itemid)
  const [value, setValue] = useState("description"); //Initialize description
  const [count, setCount] = useState(1); //Initialize count to 1, change based on user
  const [item, setItem] = useState(null); //Initialize item to Null
  const [items, setItems] = useState([]); //Initialize item list to empty

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // API to grab the item we clicked on from strapi
  async function getItem() {
    //URL for strapi which has all the item info
    const item = await fetch(
      `http://localhost:1337/api/items/${itemId}?populate=image`,
      {
        method: "GET",
      }
    );
    const itemJson = await item.json();
    setItem(itemJson.data);
  }

  // Same API as in shopping list, grabs the items from Strapi to display
  // Underneath the item page we're currently on
  //Grabs the first four items to display
  async function getItems() {
    //URL for strapi which has all the item info
    const items = await fetch(
      `http://localhost:1337/api/items?populate=image`,
      {
        method: "GET", //USing GET to obtain the item info
      }
    );
    const itemsJson = await items.json();
    setItems(itemsJson.data);
  }

  useEffect(() => {
    getItem();
    getItems(); //Disables the unused warnings when compiling
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    //Outer box which contains all of the item info as well as the image
    <Box width="80%" m="80px auto">
      {/** Uses a flex wrap so that when the size of the screen changes
       * the page shifts downward but still shows all info nicely
       */}
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px">
          <img
            alt={item?.name}
            width="100%"
            height="100%"
            //Grab all of the image data from strapi using this url
            src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
            style={{ objectFit: "contain" }}
          />
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box>

          <Box m="65px 0 25px 0">
            {/**Grab the name attribute from the item and display it */}
            <Typography variant="h3">{item?.attributes?.name}</Typography>
            <Typography>Release: {item?.attributes?.release}</Typography>
            {/** Grabs the price attribute from the item in Strapi then 
             * displays the price
             */}
            <Typography>Price: ${item?.attributes?.price}</Typography>
            {/** Button to select the shoe size you desire */}
            <Typography>Select Shoe Size: </Typography><form>
              <select id="country" name="country">
                <option value="8">8</option>
                <option value="8.5">8.5</option>
                <option value="9">9</option>
                <option value="9.5">9.5</option>
                <option value="10">10</option>
                <option value="10.5">10.5</option>
                <option value="11">11</option>
                <option value="11.5">11.5</option>
                <option value="12">12</option>
              </select>
            </form>
            {/** Grab the long description on strapi and display it underneath the
             * product as well as the short description
             */}
            <Typography sx={{ mt: "20px" }}>
              {item?.attributes?.longDescription}
            </Typography>
          </Box>
            {/** Box to display the add and minus signs next to the image
             * which allows you to add or subtract items from the order
             */}              
          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
                {/** When pressed, the item count is reduced by one */}
              <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                <RemoveIcon />
              </IconButton>
              {/** When pressed, the item count is increased by one */}
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
              }}
              //Add to cart button which adds the currently selected amount of shoes
              //to the current cart for purchase
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              ADD TO CART
            </Button>
          </Box>
          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <FavoriteBorderOutlinedIcon />
              
              <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>CATEGORIES: {item?.attributes?.category}</Typography>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="HISTORY" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && (
          <div>{item?.attributes?.longDescription}</div>
        )}
        {value === "reviews" && (
          <div>
            ***** Carson L : Been wanting a pair of these for a long time! Glad
            to finally get my hands on some! 5 Stars!
          </div>
        )}
      </Box>

      {/* RELATED ITEMS */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {/** Grabs the first four items from Strapi and diplays them
           * underneath each individual page
           */}
          {items.slice(0, 4).map((item, i) => (
            <Item key={`${item.name}-${i}`} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;
