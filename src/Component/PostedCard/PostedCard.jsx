import * as React from "react";
import "./PostedCard.css";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function PostedCard() {
  const [expanded, setExpanded] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [apiData, setApiData] = React.useState([]);

  const handleExpandClick = async () => {
    setExpanded(!expanded);
  };

  const api = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let response = await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/nom-nom/posts?page=0&limit=5",
      options
    );
    let data = await response.json();
    setApiData(data.posts);
    console.log(data);
    console.log("william", apiData);
  };

  React.useEffect(() => {
    api();
  }, []);

  return (
    <div className="renderCards">
      {apiData?.map((item, index) => {
        console.log(item);
        return (
          <Card key={index} sx={{ width: "40vw", marginTop: "2vh" }}>
            <CardMedia
              sx={{ height: "40vh" }}
              component="img"
              height="194"
              image={
                "https://www.cuisineactuelle.fr/imgre/fit/https.3A.2F.2Fi.2Epmdstatic.2Enet.2Fcac.2F2023.2F07.2F21.2Fd6d4f282-c01c-4ab0-99ca-2824d28e1fd2.2Ejpeg/750x562/quality/80/crop-from/center/cr/wqkgQmVyZ2Vyb24vU3VjcsOpIFNhbMOpIC8gQ3Vpc2luZSBBY3R1ZWxsZQ%3D%3D/focus-point/731%2C820/paella-traditionnelle.jpeg"
              }
              alt="Paella dish"
            />
            <CardContent>
              <Typography
                sx={{
                  fontSize: "3rem",
                  display: "flex",
                  justifyContent: "center",
                  color: "black",
                }}
                variant="h5"
                color="text.secondary"
              >
                {item.title}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton sx={{ color: "blue" }} aria-label="comment">
                <ShareIcon />
              </IconButton>
              <ExpandMore
                sx={{ color: "black" }}
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    display: "flex",
                    textAlign: "justify",
                    color: "black",
                  }}
                  paragraph
                >
                  {item.content}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        );
      })}
    </div>
  );
}
export default PostedCard;
