import axios from "axios";

const URL = "http://localhost:8000/api/comment";

const getComment = async (cb) => {
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

const addComment = async (comment) => {
  try {
    let result = await axios({
      method: "POST",
      url: URL,
      data: comment,
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

const removeComment = async (id) => {
  try {
    let result = await axios({
      method: "DELETE",
      url: URL + "/" + id,
    });
  } catch (e) {
    console.log(e);
  }
};
const editComment = async (id, comment) => {
  try {
    let result = await axios({
      method: "PUT",
      url: URL + "/update/" + id,
      data: comment,
    });

    console.log(result.data);
  } catch (e) {
    console.log(e);
  }
};
const commentDetails = async (id, cb) => {
  try {
    let result = await axios({
      method: "GET",
      url: URL + id,
    });

    cb(result.data.data);
  } catch (e) {
    console.log(e);
  }
};

export {
  getComment,
  addComment,
  removeComment,
  removeItAll,
  editComment,
  commentDetails,
};
