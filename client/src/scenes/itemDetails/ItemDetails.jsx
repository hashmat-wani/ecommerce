import React from "react";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { IconButton, Box, Typography, Button, Tabs, Tab } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import { useEffect } from "react";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import Item from "../../components/Item";
import axios from "axios";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const [qty, setQty] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getItem = () => {
    axios
      .get(`http://localhost:1337/api/items/${itemId}?populate=image`)
      .then((data) => setItem(data.data.data))
      .catch((err) => console.log(err));
  };
  console.log(item);

  const getItems = () => {
    axios
      .get("http://localhost:1337/api/items?populate=image")
      .then((data) => setItems(data.data.data))
      .catch((err) => console.log("error:", err));
  };

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]);

  return (
    <Box width="80% auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGE */}
        <Box flex="1 1 40%" mb="40px">
          <img
            src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
            alt={item?.attributes?.name}
            width="100%"
            height="100%"
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
            <Typography variant="h3">{item?.attributes?.name}</Typography>
            <Typography>₹{item?.attributes?.price}</Typography>
            <Typography sx={{ mt: "20px" }}>
              {item?.attributes?.longDescription}
            </Typography>
          </Box>

          {/* COUNT AND BUTTON */}
          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[500]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setQty(Math.max(qty - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{qty}</Typography>
              <IconButton onClick={() => setQty(Math.max(qty + 1))}>
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
              onClick={() => dispatch(addToCart({ ...item, qty }))}
            >
              ADD TO CART
            </Button>
          </Box>

          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>CATEGORIES:{item?.attributes?.category}</Typography>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>

      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" ? (
          <div>{item?.attributes?.longDescription}</div>
        ) : (
          <div>reviews</div>
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
          {items.slice(0, 4).map((item, i) => (
            <Item key={`${item?.attributes?.name}-${i}`} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;
