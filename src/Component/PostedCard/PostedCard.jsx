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
import MoreVertIcon from "@mui/icons-material/MoreVert";
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
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [commentInputOpen, setCommentInputOpen] = useState(false);
  const [comment, setComment] = useState("");

  const handleExpandClick = async () => {
    setExpanded(!expanded);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    };
    const response = await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/nom-nom/login/PostedCard",
      options
    );

    const data = await response.json();
  };

  const handleCommentClick = () => {
    setCommentInputOpen(true);
  };

  const handleCommentSubmit = () => {
    // Traiter le commentaire ici (par exemple, l'envoyer au serveur)
    setComment(""); // Réinitialiser l'input après soumission
  };

  return (
    <div className="renderCards">
      <Card sx={{ width: "40vw", marginTop: "2vh" }}>
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
              fontSize: "1rem",
              display: "flex",
              justifyContent: "center",
              color: "black",
            }}
            variant="h5"
            color="text.secondary"
          >
            PAËLLA{title}
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
                fontSize: "0.8rem",
                display: "flex",
                textAlign: "justify",
                color: "black",
              }}
              paragraph
            >
              Méthode : Faites chauffer 1/2 tasse de bouillon dans une casserole
              jusqu'à ébullition, ajoutez safran et laisser reposer 10 minutes.
              Chauffer l'huile dans un (14 à Poêle à paella de 16 pouces ou une
              grande poêle profonde à feu moyen-vif chaleur. Ajouter le poulet,
              les crevettes et le chorizo ​​et cuire en remuant. de temps en
              temps jusqu'à ce qu'ils soient légèrement dorés, 6 à 8 minutes.
              Transfert crevettes dans une grande assiette et réserver, en
              laissant le poulet et le chorizo dans la casserole. Ajouter le
              pimentón, les feuilles de laurier, l'ail, les tomates, l'oignon,
              saler et poivrer et cuire en remuant souvent jusqu'à
              épaississement et parfumé, environ 10 minutes. Ajouter le bouillon
              de safran et les 4 1/2 restants tasses de bouillon de poulet ;
              porter à ébullition. Ajouter le riz et remuer très doucement
              distribuer. Garnir d'artichauts et de poivrons et cuire sans en
              remuant jusqu'à ce que la majeure partie du liquide soit absorbée,
              15 à 18 minutes. Réduire le feu à moyen-doux, ajouter les
              crevettes et les moules réservées, les glisser dans le riz et
              cuire à nouveau sans remuer, jusqu'à ce que les moules soient
              ouvertes et que le riz soit juste tendre, 5 à 7 minutes plus.
              (Jetez toutes les moules qui ne s'ouvrent pas.) Réservez du
              chauffer pour laisser reposer 10 minutes, puis servir.{content}
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
    </div>
  );
}

export default PostedCard;
