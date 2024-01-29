import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { getForum } from "../axios/ForumAxios";
import Link from "@mui/material/Link";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { userDetails } from "../axios/UserAxios";

export default function ForumContent() {
  const [forum, setForum] = useState([]);
  const [user, setUser] = useState({});

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

  const getUsername = (userid) => {
    userDetails(userid, (result) => {
      setUser(result.username);
    });
  }

  useEffect(() => {
    getForum((result) => setForum(result));
    
    
  }, []);
  
  window.Echo.channel("forum").listen("ForumCreated", (event) => {
    console.log("Berhasil Listen");
    console.log(event);
      setForum((forum) => [...forum, event])
    /* window.location.reload() */
  });
  return (
    <List sx={{ width: "100%", bgcolor: "white", variant: "outlined" }}>
      {forum.length > 0 ? (
        forum.map((forums) => {
          const { id, user_id, title, body, /* created_at */ } = forums;
/*           userDetails(user_id, (result) => {
            setUser(result);
          }); */
          const link = "/forum/" + id;
          return (
            <div className="forum">
              <Link href={`/forum/${id}`} variant="body2" sx={{textDecoration: 'none'}}>
                <ListItem alignItems="flex-start" >
                  <ListItemAvatar>
                    <Avatar alt={user_id} />
                  </ListItemAvatar>
                  <ListItemText
                  sx={{textDecoration: 'none'}}
                    primary={title}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline", textDecoration: 'none'}}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {user.username} at {/* {created_at.slice(0, 10)} */}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </Link>
              
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
            Kosong
          </Typography>
        </div>
      )}
    </List>
  );
}
