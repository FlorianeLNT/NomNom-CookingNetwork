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
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";
import BasicPagination from "../Pagination/Pagination";
import Alert from "@mui/material/Alert";

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
  const [expandedComment, setExpandedComment] = React.useState(false);
  const [apiData, setApiData] = React.useState([]);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [comment, setComment] = useState("");
  const [posts, setPosts] = useState("");
  const [postIdToComment, setPostIdToComment] = useState("");
  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = useState("");
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);
  const [maxPage, setMaxPage] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [expandedCards, setExpandedCards] = useState([]);
  const [expandedCommentCards, setExpandedCommentCards] = useState([]);

  const navigateToUserProfile = (userId) => {
    navigate(`/user/${userId}`);
  };

  const getUserId = async (event) => {
    event.preventDefault();

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      `https://social-network-api.osc-fr1.scalingo.io/nom-nom/user/${userId}`,
      options
    );

    const data = await response.json();
  };
  const navigateToTargetUser = () => {
    navigate(`/user/${userId}`);
  };

  const handleExpandClick = async (postId) => {
    if (expandedCards.includes(postId)) {
      setExpandedCards(expandedCards.filter((id) => id !== postId));
    } else {
      setExpandedCards([postId]);
    }
  };
  const handleExpandClickComment = async (postId) => {
    if (expandedCommentCards.includes(postId)) {
      setExpandedCommentCards(
        expandedCommentCards.filter((id) => id !== postId)
      );
    } else {
      setExpandedCommentCards([postId]);
    }
  };

  const renderTitle = (item) => {
    return (
      <div>
        {item.title} par{" "}
        <Link
          className="linkCom"
          to={`/user/${item.userId}`}
          onClick={() => navigateToUserProfile(item.userId)}
        >
          {item.firstname} {item.lastname}
        </Link>{" "}
      </div>
    );
  };

  const renderComments = (item) => {
    return item.comments.map((comment, index) => (
      <div key={index}>
        <Link
          className="linkCom"
          to={`/user/${comment.userId}`}
          onClick={() => navigateToUserProfile(comment.userId)}
        >
          {comment.firstname} {comment.lastname}
        </Link>
        : {comment.content}
      </div>
    ));
  };

  const api = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let response = await fetch(
      `https://social-network-api.osc-fr1.scalingo.io/nom-nom/posts?page=${page}&limit=5`,
      options
    );
    let data = await response.json();
    setApiData(data.posts);
    setMaxPage(data.totalPages);
    console.log(data);
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
            Authorization: "bearer " + localStorage.getItem("token"),
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
      setError("Vous devez être connecté pour faire ceci");
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
            Authorization: "bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            postId: postIdToComment,
            content: comment,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur de réseau - ${response.status}`);
      }
      api();
    } catch (error) {
      setError("Vous devez être connecté pour faire ceci");
    }
  };

  React.useEffect(() => {
    api();
  }, [page]);

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
                  <div className="title">{renderTitle(item)}</div>
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Checkbox
                  {...label}
                  icon={<FavoriteBorder style={{ color: "#6b041f" }} />}
                  checkedIcon={<Favorite style={{ color: "#6b041f" }} />}
                  onClick={() => handleCheckedIcon(item._id)}
                />
                <span>{item.likes.length}</span>
                <Button>
                  <AddCommentIcon
                    sx={{ color: "#6b041f", "&:hover": { color: "#a60631" } }}
                    onClick={() => {
                      handleCommentClick(item._id);
                      handleOpen();
                    }}
                  />
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
                          "& .MuiTextField-root": { m: 1, width: "50ch" },
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
                            onClick={() => {
                              handleCommentSubmit(item._id);
                              handleClose();
                            }}
                          >
                            <SendIcon />
                          </IconButton>
                        </div>
                      </Box>
                    </Box>
                  </Modal>
                </Button>
                {error && <Alert severity="error">{error}</Alert>}
                <div className="recette">
                  <ExpandMore
                    sx={{ color: "black" }}
                    expand={expanded}
                    onClick={() => handleExpandClick(item._id)}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    {" "}
                    <p>Voir la recette</p>
                    <ExpandMoreIcon />
                  </ExpandMore>
                </div>
              </CardActions>
              <Collapse
                in={expandedCards.includes(item._id)}
                timeout="auto"
                unmountOnExit
              >
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
              <div>
                <CardActions>
                  <div className="commentaires">
                    <ExpandMore
                      sx={{ color: "black" }}
                      expand={expandedComment}
                      onClick={() => handleExpandClickComment(item._id)}
                      aria-expanded={expandedComment}
                      aria-label="show more"
                    >
                      <p>{item.comments.length} commentaire(s)</p>
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </div>
                </CardActions>
                <Collapse
                  in={expandedCommentCards.includes(item._id)}
                  timeout="auto"
                  unmountOnExit
                >
                  <div className="comments">{renderComments(item)}</div>
                </Collapse>
              </div>
            </Card>
          </div>
        );
      })}
      <BasicPagination
        className="pagination"
        maxPage={maxPage}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}

export default PostedCard;
