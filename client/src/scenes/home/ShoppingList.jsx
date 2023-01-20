import React from "react";

import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { Box, Typography, Tab, Tabs, useMediaQuery } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { setItems } from "../../state";
import { useEffect } from "react";
import Item from "../../components/Item";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const { items } = useSelector((state) => state.cartReducer, shallowEqual);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => setValue(newValue);

  const getItems = () => {
    axios
      .get("http://localhost:1337/api/items?populate=image")
      .then((data) => dispatch(setItems(data.data.data)))
      .catch((err) => console.log("error:", err));
  };

  useEffect(() => {
    getItems();
  }, []);
  // console.log(items);

  const topRatedItems = items.filter(
    (item) => item.attributes.category === "topRated"
  );
  const newArrivalItems = items.filter(
    (item) => item.attributes.category === "newArrival"
  );
  const bestSellerItems = items.filter(
    (item) => item.attributes.category === "bestSeller"
  );

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>

      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
        sx={{
          m: "25px",
          "&.MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="NEW ARRIVALS" value="newArrivals" />
        <Tab label="BEST SELLERS" value="bestSeller" />
        <Tab label="TOP RATED" value="topRated" />
      </Tabs>

      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill,300px)"
        justifyContent="space-around"
        rowGap="25px"
        columnGap="1.33%"
      >
        {value === "all" &&
          items.map((item) => (
            <Item item={item} key={`${item.attributes.name}-${item.id}`} />
          ))}
        {value === "newArrivals" &&
          newArrivalItems.map((item) => (
            <Item item={item} key={`${item.attributes.name}-${item.id}`} />
          ))}
        {value === "bestSeller" &&
          bestSellerItems.map((item) => (
            <Item item={item} key={`${item.attributes.name}-${item.id}`} />
          ))}
        {value === "topRated" &&
          topRatedItems.map((item) => (
            <Item item={item} key={`${item.attributes.name}-${item.id}`} />
          ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;
