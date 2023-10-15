// ContentListingPage.js
import { Grid } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import ContentItem from "./ContentItem";

const Container = styled("div")({
  overflowY: "auto",
  padding: "16px 0px 16px 16px",
});

const ContentListingPage = ({ contentData }) => {
  return (
    <Container>
      {contentData && (
        <Grid container spacing={2}>
          {contentData.map((item, index) => (
            <Grid item xs={4} sm={6} md={4} key={index}>
              <ContentItem item={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ContentListingPage;
