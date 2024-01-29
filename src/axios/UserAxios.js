import axios from "axios";

const URL = "http://localhost:8000/api/user";

const getUser = async (cb) => {
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

const addUser = async (user) => {
  try {
    let result = await axios({
      method: "POST",
      url: URL,
      data: user,
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

const removeUser = async (id) => {
  try {
    let result = await axios({
      method: "DELETE",
      url: URL + "/delete/" + id,
    });
  } catch (e) {
    console.log(e);
  }
};
const editUser = async (id, user) => {
  try {
    let result = await axios({
      method: "PUT",
      url: URL + "/update/" + id,
      data: user,
    });

    console.log(result.data);
  } catch (e) {
    console.log(e);
  }
};
const userDetails = async (id, cb) => {
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

export { getUser, addUser, removeUser, removeItAll, editUser, userDetails };
