import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { shades } from "../../theme";

// Imports all of the images from the assets folder
const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item); //Grabs each item and removes the "./" in the path to create a new item
    return acc; //Return the new item
  }, {});

export const heroTextureImports = importAll(
  require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
); //Takes all of the imported images and creates a list that we can pass into the Carousel

const MainCarousel = () => {
    //Gives us a value that becomes true if the screen size is above 600px
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    // Source: https://github.com/leandrowd/react-responsive-carousel
    <Carousel
      infiniteLoop={true} //Carousel repeats pics when reaches end
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      //Modify the prev pic button
      //Use onClick handler to access prev picture
      renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <IconButton
          onClick={onClickHandler} //Given to us from the react response carousel
          //Style for button
          sx={{
            position: "absolute",
            top: "50%",
            left: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateBeforeIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      //Same as prev button but uses NextIcon instead
      //Use onClickHandler to access next image
      renderArrowNext={(onClickHandler, hasNext, label) => (
        <IconButton
          onClick={onClickHandler}
          //Style for the arrow next button
          sx={{
            position: "absolute",
            top: "50%",
            right: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateNextIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    >
        {/* Grabbing the images from the list we made before in heroTextureImports */}
      {Object.values(heroTextureImports).map((texture, index) => (
        <Box key={`carousel-image-${index}`}>
          <img
            src={texture}
            alt={`carousel-${index}`}
            style={{
              width: "100%",
              height: "700px",
              objectFit: "cover", //Allows the carousel to be responsive as the dimensions change
              backgroundAttachment: "fixed", //Keeps it in place
            }}
          />
          <Box
            //This creates the box within the carousel for text
            //Style for box
            color="white"
            padding="20px"
            borderRadius="1px"
            textAlign="left"
            backgroundColor="rgb(0, 0, 0, 0.4)" //Slightly opaque
            position="absolute" //Positioned in the middle of the image from the top
            top="46%"
            //Checks to see if the page is open on a mobile or web browser
            //Web browser on the left and mobile on the right
            left={isNonMobile ? "10%" : "0"}
            right={isNonMobile ? undefined : "0"}
            margin={isNonMobile ? undefined : "0 auto"}
            maxWidth={isNonMobile ? undefined : "240px"}
          >
            {/* TEXT in the middle of the carousel  */}
            <Typography color={shades.secondary[200]}>-- FRESH DROPS</Typography>
            <Typography variant="h1">End of Semester Sale</Typography>
            <Typography fontWeight="bold" color={shades.secondary[300]}
              sx={{ textDecoration: "underline" }}
            >
              Find Out More
            </Typography>
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default MainCarousel;
