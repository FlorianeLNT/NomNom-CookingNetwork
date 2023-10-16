import "./Comment.css";
import { useState } from "react";
const [comments, setComments] = [];

function Comment() {
  return <div>{comments}</div>;
}

export default Comment;
