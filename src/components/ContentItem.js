// ContentItem.js
import React from "react";
import { styled } from "@mui/system";
import { Paper } from "@mui/material";
import { Image } from "../design-system/Image";

const CustomPaper = styled(Paper)({
  backgroundColor: "#171717",
  padding: "unset !important",
  boxShadow: "unset",
});

const Item = styled(Paper)({
  backgroundColor: "#171717",
  color: "#ffffff",
  fontFamily: "Titillium Web",
  fontSize: "16px",
});

const ContentItem = ({ item }) => {
  return (
    <CustomPaper elevation={3} sx={{ padding: 2 }}>
      <Image
        image={` https://test.create.diagnal.com/images/${
          item["poster-image"] === "posterthatismissing.jpg"
            ? "placeholder_for_missing_posters.png"
            : item["poster-image"]
        }`}
      ></Image>
      <Item>{item.name}</Item>
    </CustomPaper>
  );
};

export default ContentItem;
