import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line
import { Box, Typography, Tab, Tabs, useMediaQuery } from "@mui/material";
// eslint-disable-next-line
import Item from "../../components/Item";
import { setItems } from "../../state";

const ShoppingList = () => {
  const dispatch = useDispatch(); //Triggers each action
  // eslint-disable-next-line
  const [value, setValue] = useState("all"); //Represents the value for the filter function
  const items = useSelector((state) => state.cart.items);
  // eslint-disable-next-line
  const isNonMobile = useMediaQuery("(min-width:600px)");
  console.log("items", items);

  // eslint-disable-next-line
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //Calls the backend to grab the items from Strapi
  async function getItems() {
    const items = await fetch(
      "http://localhost:1337/api/items?populate=image",
      { method: "GET" }
    );
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson.data));
  }

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //Grabs the items from strapi with the same catregory tag listed below
  //Grabs top rated items
  const topRatedItems = items.filter(
    (item) => item.attributes.category === "topRated"
  );
  //Grabs the new arrival items
  const newArrivalsItems = items.filter(
    (item) => item.attributes.category === "newArrivals"
  );
  //Grabs the best selling items
  const bestSellersItems = items.filter(
    (item) => item.attributes.category === "bestSellers"
  );
  //Grabs the upcoming release items
  const upcomingDropsItems = items.filter(
    (item) => item.attributes.category === "upcomingDrops"
  );

  return (
    //Styling for the home page title which says "Featured Items"
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Featured <b>Items</b>
      </Typography>
      {/* Styling for each of the 5 tabs underneath the "featured items"*/}
      <Tabs
        textColor="primary" //primary colors found in theme
        indicatorColor="primary" //theme
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
        //Style for the tabs underneath the carousel
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        {/* Grab the items with the specific value from strapi */}
        <Tab label="ALL" value="all" />
        <Tab label="NEW ARRIVALS" value="newArrivals" />
        <Tab label="BEST SELLERS" value="bestSellers" />
        <Tab label="TOP RATED" value="topRated" />
        <Tab label="UPCOMING DROPS" value="upcomingDrops" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid" //Display pictures in a grid style
        gridTemplateColumns="repeat(auto-fill, 300px)" //Each column has 300px and is filled to the picture
        justifyContent="space-around" //Space around each image is 20px above below
        rowGap="20px"
        columnGap="1.33%" //Gap between items left to right 
      >
        {value === "all" &&
          items.map((item) => (
            //Using the item component we created, we pass in the key as well
            //To display under the "All" tab
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
          {/* Maps the items with the category newArrivals to the tab 
                designated New arrivals */}
        {value === "newArrivals" &&
          newArrivalsItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
          {/* Maps the items with the category bestSellers to the tab 
                designated best sellers */}
        {value === "bestSellers" &&
          bestSellersItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
          {/* Maps the items with the category topRated to the tab 
                designated top rated */}
        {value === "topRated" &&
          topRatedItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
          {/* Maps the items with the category upcomingDrops to the tab 
                designated upcomingDrops */}
        {value === "upcomingDrops" &&
          upcomingDropsItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;
