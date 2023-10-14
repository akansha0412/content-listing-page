// App.js
import { styled } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import ContentListingPage from "./components/ContentListingPage";
import { SearchField } from "./design-system/SearchField";

const MyComponent = styled("div")({
  backgroundColor: "#171717",
  color: "#ffffff",
  fontFamily: "Titillium Web",
  overflowX: "hidden",
  height: "100vh",
});

const TitleDiv = styled("div")({
  display: "flex",
  alignItems: "center",
});

const Title = styled("div")({
  paddingTop: "20px",
  fontSize: "24px",
  fontWeight: 600,
});

const TitleContainer = styled("div")({
  position: "sticky",
  top: 0,
  backgroundColor: "#171717",
  padding: "16px",
  boxShadow: "0 4px 4px 0 #171717",
});

const NoResult = styled("div")({
  fontSize: "20px",
  color: "#ffffff",
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
});

function App() {
  const [contentData, setContentData] = useState();
  const [contentItems, setContentItems] = useState([]);
  const [page, setPage] = useState(1);
  const [isSearchResult, setIsSearchResult] = useState(true);
  const contentItemRef = useRef([]);

  useEffect(() => {
    // Fetch data here and set it using setContentData
    fetch(`https://test.create.diagnal.com/data/page${page}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response
          .text() // Read the response as text
          .then((textResponse) => {
            try {
              const data = JSON.parse(textResponse); // Attempt to parse JSON
              setContentData(data);
              const newData = data.page["content-items"]["content"];
              setContentItems([...contentItems, ...newData]);
              contentItemRef.current = [...contentItems, ...newData];
              // Use the data here
            } catch (error) {
              console.error("Error parsing JSON:", error);
            }
          });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [page]);

  useEffect(() => {
    if (document.getElementById("content")) {
      document
        .getElementById("content")
        .addEventListener("scroll", handleScroll);
      return () => {
        document
          .getElementById("content")
          .removeEventListener("scroll", handleScroll);
      };
    }
  });

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } =
      document.getElementById("content");
    if (
      contentItemRef.current.length < contentData.page["total-content-items"]
    ) {
      // Check if the user is near the bottom
      if (scrollHeight - scrollTop === clientHeight) {
        const newPage = page + 1;
        setPage(newPage);
      }
    }
  };

  const handleSearch = (searchValue) => {
    if (searchValue) {
      const filteredContent = contentItems.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      filteredContent.length === 0 && setIsSearchResult(false);
      setContentItems(filteredContent);
      return;
    }
    setContentItems(contentItemRef.current);
    setIsSearchResult(true);
  };

  return (
    <div>
      {
        <MyComponent id="content">
          <TitleContainer>
            <TitleDiv>
              <img
                src={` https://test.create.diagnal.com/images/Back.png`}
                alt={"search"}
                style={{ height: "20px", width: "20px", marginRight: "16px" }}
              />
              <SearchField onSearch={handleSearch} placeholder={"Search..."} />
            </TitleDiv>
            {contentData && <Title>{contentData.page.title}</Title>}
          </TitleContainer>
          {!isSearchResult && <NoResult>'No Result Found'</NoResult>}
          {contentData && <ContentListingPage contentData={contentItems} />}
        </MyComponent>
      }
      {!isSearchResult && <NoResult>No Result Found</NoResult>}
    </div>
  );
}

export default App;
