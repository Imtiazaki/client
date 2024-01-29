import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editForum, forumDetails, removeForum } from "../axios/ForumAxios";
import { userDetails } from "../axios/UserAxios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import { getComment, addComment } from "../axios/CommentAxios";
import axios from "axios";
import CommentContent from "./CommentContent";
import Link from "@mui/material/Link";

export default function ForumDetails() {
  const token = localStorage.getItem("token");
  const URL = "http://localhost:8000/api/comment";
  const [form, setForm] = useState({
    created_at: ""
  });
  /*   const [username, setUsername] = useState({
    username: "",
  }); */
  const userId = localStorage.getItem("user_id");
  const params = useParams();
  const { id } = params;
  const [comment, setComment] = useState({
    forum_id: "" + id.toString(),
    user_id: "" + userId,
    title: "",
    body: "",
  });
  const deleteButton = (poster) => {
    return poster === userId ? (
      <Button
        variant="text"
        sx={{ mt: 1, ml: 1 }}
        onClick={deleteHandler}
        color="error"
      >
        Delete
      </Button>
    ) : (
      ""
    );
  };
  const cekToken = (token) => {
    return !token ? (
      <Link href={`/login`} variant="body2">
        <Button variant="text" sx={{ mt: 1, ml: 1 }}>
          Reply
        </Button>
      </Link>
    ) : (
      <Button variant="text" sx={{ mt: 1, ml: 1 }} onClick={handleClick}>
        Reply
      </Button>
    );
  };

  const navigation = useNavigate();

  /*   const submitHandler = () => {
    editForum(+params.id, form);
    navigation("/forum");
  }; */
  const [open, setOpen] = useState(false);
  const commentHandler = () => {
    addComment(comment);
    console.log(comment);
    setOpen(!open);
  };

  

  const handleClick = () => {
    setComment({ ...comment, title: "" + form.body.slice(0, 15) });
    setOpen(!open);
  };

  const deleteHandler = () => {
    removeForum(id);
    navigation(`/`);
  };
  /*   const editHandler = () => {
    navigation(`/forum/edit/${id}`);
  }; */

  useEffect(() => {
    forumDetails(+id, (result) => {
      setForm(result);
      console.log(form.body.slice(0, 15));
    });
    /*     userDetails(form.user_id, (result) => {
      setUsername(result);
    });
    console.log(username.username); */
  }, []);
  
  return (
    <Box sx={{ width: "100%" }}>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={form.user_id} />
          </ListItemAvatar>
          <ListItemText
            primary={<b>{form.title}</b>}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {form.body}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
      {/*       <Typography
        align="left"
        variant="body1"
        gutterBottom
        sx={{ ml: 9, mr: 3 }}
      >
        {form.body}
      </Typography> */}
      <Stack direction="row" justifyContent="end">
        {/*         <Button
          variant="text"
          sx={{ my: 3, ml: 1 }}
          onClick={editHandler}
          color="secondary"
        >
          Edit
        </Button> */}
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          sx={{ mt: 2.25 }}
        >
          {form.created_at.slice(0,10)} at {form.created_at.slice(11,16)}
        </Typography>
        {deleteButton(form.user_id)}
        {cekToken(token)}
      </Stack>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <div>
            <Box sx={{ width: "95%", ml: 1 }}>
              <TextField
                onChange={(e) =>
                  setComment({ ...comment, body: e.target.value })
                }
                fullWidth
                sx={{ m: 1 }}
                id="outlined-multiline-static"
                label="Comment"
                multiline
                rows={4}
                defaultValue=""
                width="100%"
              />
              <Stack direction="row" justifyContent="end">
                <Button
                  onClick={commentHandler}
                  variant="outlined"
                  sx={{ my: 1, ml: 2 }}
                >
                  Post
                </Button>
              </Stack>
            </Box>
          </div>
        </List>
      </Collapse>
      <CommentContent />
    </Box>
  );
}
