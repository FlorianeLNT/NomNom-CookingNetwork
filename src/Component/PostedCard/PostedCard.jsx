import * as React from "react";
import "./PostedCard.css";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Checkbox from "@mui/material/Checkbox";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import Comment from "../Comment/comment";

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
  const [token, setToken] = useState(localStorage.getItem("token"));
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [commentInputOpen, setCommentInputOpen] = useState(false);
  const [comment, setComment] = useState("");

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
    console.log(apiData);
  };

  const handleCommentClick = () => {
    setCommentInputOpen(true);
  };

  const handleCommentSubmit = () => {
    setComment("");
  };

  React.useEffect(() => {
    api();
  }, []);

  return (
    <div className="renderCards">
      {apiData?.map((item, index) => {
        console.log(item);
        return (
          <>
            <Card key={index} sx={{ width: "40vw", marginTop: "2vh" }}>
              <CardMedia
                sx={{ height: "40vh" }}
                component="img"
                height="194"
                image={"https://i.postimg.cc/x8ShYD03/Logo-Nom-Nom.png"}
                alt="LogoNomNom"
              />
              <CardContent>
                <Typography
                  sx={{
                    fontSize: "2.5rem",
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
                <Checkbox
                  {...label}
                  icon={<FavoriteBorder style={{ color: "red" }} />}
                  checkedIcon={<Favorite style={{ color: "red" }} />}
                />

                <IconButton onClick={handleCommentClick}>
                  <AddCommentIcon />
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
            {commentInputOpen && (
              <div className="Comment">
                <input
                  type="text"
                  placeholder="Votre commentaire..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button onClick={handleCommentSubmit}>Commenter</button>
              </div>
            )}
            <Comment />
          </>
        );
      })}
    </div>
  );
}

export default PostedCard;
