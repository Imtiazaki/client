import axios from "axios";

const URL = "http://localhost:8000/api/forum";

const getForum = async (cb) => {
  try {
    let result = await axios({
      method: "GET",
      url: URL,
    });
    cb(result.data.data);
  } catch (e) {
    console.log(e);
  }
};

const addForum = async (forum) => {
  try {
    let result = await axios({
      method: "POST",
      url: URL,
      data: forum,
      headers: { 
        'X-Socket-Id': window.Echo.socketId()
      }
    });
  } catch (e) {
    console.log(e);
  }
};

const removeItAll = async () => {
  try {
    let result = await axios({
      method: "DELETE",
      url: URL,
    });
  } catch (e) {
    console.log(e);
  }
};

const removeForum = async (id) => {
  try {
    let result = await axios({
      method: "DELETE",
      url: URL + "/" + id,
    });
  } catch (e) {
    console.log(e);
  }
};
const editForum = async (id, forum) => {
  try {
    let result = await axios({
      method: "PUT",
      url: URL + "/update/" + id,
      data: forum,
    });

    console.log(result.data);
  } catch (e) {
    console.log(e);
  }
};
const forumDetails = async (id, cb) => {
  try {
    let result = await axios({
      method: "GET",
      url: URL + "/" + id,
    });

    cb(result.data.data);
  } catch (e) {
    console.log(e);
  }
};

export {
  getForum,
  addForum,
  removeForum,
  removeItAll,
  editForum,
  forumDetails,
};
