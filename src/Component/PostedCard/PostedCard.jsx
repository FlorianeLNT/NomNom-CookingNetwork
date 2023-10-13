import * as React from "react";
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
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image={
          "https://www.cuisineactuelle.fr/imgre/fit/https.3A.2F.2Fi.2Epmdstatic.2Enet.2Fcac.2F2023.2F07.2F21.2Fd6d4f282-c01c-4ab0-99ca-2824d28e1fd2.2Ejpeg/750x562/quality/80/crop-from/center/cr/wqkgQmVyZ2Vyb24vU3VjcsOpIFNhbMOpIC8gQ3Vpc2luZSBBY3R1ZWxsZQ%3D%3D/focus-point/731%2C820/paella-traditionnelle.jpeg"
        }
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="h5" color="text.secondary">
          PAËLLA{title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
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
          <Typography paragraph>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            odio saepe fuga laborum quo dolor laboriosam harum quasi aspernatur
            vel soluta ea sapiente unde cum, assumenda ducimus, tempore ipsum
            laudantium consequuntur error aliquid iure? Velit, repellendus
            dolores explicabo architecto reiciendis exercitationem quia,
            delectus, vel alias necessitatibus repudiandae ad. Ab eos rem
            officia nostrum unde? Dolore consequuntur, ducimus quasi ut quae
            laudantium odio nemo veniam iusto soluta eligendi officia facere
            distinctio maiores beatae cumque culpa esse earum rerum, dignissimos
            consequatur. Inventore, repellat! Quisquam voluptates, porro
            reiciendis mollitia veritatis debitis omnis deleniti ipsa tempora
            dolorem eaque est, ex libero eius voluptatum repudiandae fugit et
            facere incidunt. Dolores non iusto eum debitis fugiat labore
            praesentium cum excepturi. Perferendis incidunt harum quos nobis.
            Harum commodi cumque natus earum nemo id, atque obcaecati, expedita
            ipsum laborum voluptatum explicabo assumenda eos aperiam blanditiis
            adipisci odit animi aliquid veritatis et accusantium porro iusto.
            Veritatis voluptatem quas iure?{content}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
export default PostedCard;
