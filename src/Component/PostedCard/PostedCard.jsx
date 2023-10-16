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
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function PostedCard() {
  const [expanded, setExpanded] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [apiData, setApiData] = React.useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [commentInputOpen, setCommentInputOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [postIdToComment, setPostIdToComment] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const handleCommentClick = (postId) => {
    setPostIdToComment(postId);
  };

  const handleCheckedIcon = async (postId) => {
    try {
      const response = await fetch(
        `https://social-network-api.osc-fr1.scalingo.io/nom-nom/post/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + token,
          },
          body: JSON.stringify({
            postId: postId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur de réseau - ${response.status}`);
      }
      api();
    } catch (error) {
      console.error("Erreur lors de la soumission du commentaire : " + error);
    }
  };

  const handleCommentSubmit = async (postId) => {
    try {
      const response = await fetch(
        `https://social-network-api.osc-fr1.scalingo.io/nom-nom/post/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + token,
          },
          body: JSON.stringify({
            postId: postId,
            content: comment,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur de réseau - ${response.status}`);
      }
      api();
    } catch (error) {
      console.error("Erreur lors de la soumission du commentaire : " + error);
    }
  };

  React.useEffect(() => {
    api();
  }, []);

  return (
    <div className="renderCards">
      {apiData?.map((item, index) => {
        return (
          <div key={index}>
            <Card sx={{ width: "40vw", marginTop: "4vh" }}>
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
                  onClick={() => handleCheckedIcon(item._id)}
                />
                <span>{item.likes.length}</span>

                <Button
                  onClick={() => {
                    handleOpen();
                    handleCommentClick(item._id);
                  }}
                >
                  <AddCommentIcon />
                  <Modal
                    className="modal"
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Ajouter un commentaire :
                      </Typography>
                      <Box
                        component="form"
                        sx={{
                          "& .MuiTextField-root": { m: 1, width: "25ch" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <div>
                          <TextField
                            id="outlined-multiline-static"
                            label=""
                            multiline
                            rows={10}
                            defaultValue=""
                            onChange={(e) => setComment(e.target.value)}
                          />
                          <IconButton
                            onClick={() => handleCommentSubmit(item._id)}
                          >
                            <SendIcon />
                          </IconButton>
                        </div>
                      </Box>
                    </Box>
                  </Modal>
                </Button>
                <span>{item.comments.length}</span>
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
                <div className="comments">
                  {item.comments.map((comment, commentIndex) => (
                    <Comment key={commentIndex} content={comment.content} />
                  ))}
                </div>
              </Collapse>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

export default PostedCard;
