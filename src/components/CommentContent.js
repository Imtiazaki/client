import * as React from "react";
import { useRef } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { getComment } from "../axios/CommentAxios";
import Link from "@mui/material/Link";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { userDetails } from "../axios/UserAxios";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate, useParams } from "react-router-dom";
import { addComment, removeComment } from "../axios/CommentAxios";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export default function CommentContent() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState({});
  const [color, setColor] = useState("");
  const params = useParams();
  const { id } = params;
  const navigation = useNavigate();
  const [comment, setComment] = useState({
    forum_id: "" + id.toString(),
    user_id: "" + userId,
    title: "",
    body: "",
  });
  const ref = useRef < HTMLDivElement > null;

  window.Pusher = Pusher;

  window.Echo = new Echo({
    broadcaster: "pusher",
    key: "f171d63df169dea198f8",
    cluster: "ap1",
    wsHost: "",
    wsPort: 80,
    wssPort: 443,
    forceTLS: "https",
    enabledTransports: ["ws", "wss"],
  });

  const deleteHandler = () => {
    removeComment(id);
    navigation(`/forum/${id}`);
  };

  const commentHandler = () => {
    addComment(comment);
    console.log(comment);
    window.Echo.channel("comment").listen("CommentCreated", (event) => {
      console.log("Berhasil Listen");
      setComments((comment) => [...comment, event])
      /* window.location.reload() */
    });
  };

  const deleteButton = (poster) => {
    return poster === userId ? (
      <Button
        variant="text"
        sx={{ ml: 1 }}
        onClick={deleteHandler}
        color="error"
        size="small"
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
        <Button size="small" variant="text" sx={{ ml: 1 }}>
          Reply
        </Button>
      </Link>
    ) : (
      <Button size="small" variant="text" sx={{ ml: 1 }} onClick={handleClick}>
        Reply
      </Button>
    );
  };

  const handleClick = () => {
    if (open === false) {
      setOpen(!open);
    }
  };

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    getComment((result) => setComments(result));
    /*       window.Echo.channel("comment").listen("CommentCreated", (event) => {
        console.log("Berhasil Listen");
        forum.push({
          user_id: event.forum.user_id,
          title: event.forum.title,
          body: event.forum.body,
        });
        window.location.reload();
      }); */
    if (open) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, []);
  const filtered = comments.filter(function (e) {
    return e.forum_id === id;
  });

  return (
    <Box sx={{ width: "100%" }}>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Typography variant="button" gutterBottom>
          {filtered.length} Comment(s)
        </Typography>
        {filtered.length > 0 ? (
          filtered.map((comments) => {
            const { id, user_id, title, body, created_at } = comments;

            /*           user_id == null && user_id == undefined
            ? userDetails(user_id, (result) => {
                setUser(result);
              })
            : (user.username = "Failed to get username"); */
            const link = "/comments/" + id;
            return (
              <div className="comments">
                <Box sx={{ bgcolor: "#F0F8FF", mt: 0.5 }}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={user.username} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.username}
                      secondary={
                        <React.Fragment>
                          <Stack direction="column">
                            <Stack direction="row">
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                Replied to
                              </Typography>

                              {" — \n" + `"${title}..."`}
                            </Stack>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body1"
                              color="text.primary"
                            >
                              {body}
                            </Typography>
                          </Stack>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Stack direction="row" justifyContent="end">
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      sx={{ mt: 0.75 }}
                    >
                      {created_at.slice(11, 16)}
                    </Typography>
                    {deleteButton(user_id)}
                    {cekToken(token)}
                  </Stack>
                  <Divider variant="inset" component="li" />
                </Box>
              </div>
            );
          })
        ) : (
          <div className="keterangan">
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Add a new one !
            </Typography>
          </div>
        )}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <div>
              <Box sx={{ width: "95%", mr: 2 }}>
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
                    onClick={handleClose}
                    variant="outlined"
                    color="error"
                    sx={{ my: 1, ml: 2 }}
                    size="small"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={commentHandler}
                    variant="outlined"
                    sx={{ my: 1, ml: 2 }}
                    size="small"
                  >
                    Post
                  </Button>
                </Stack>
              </Box>
            </div>
          </List>
        </Collapse>
      </List>
    </Box>
  );
}
