import axios from "axios";

const URL = "http://localhost:8000/api/login";

const getToken = async (cb) => {
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

const getLogin = async (forum) => {
  try {
    let result = await axios({
      method: "POST",
      url: URL,
      data: {
        data: forum,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
