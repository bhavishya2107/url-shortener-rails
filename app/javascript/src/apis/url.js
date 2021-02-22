import axios from "axios";

const create = payload => axios.post("/urls", payload);
const list = () => axios.get("/urls");

const urlsApi = {
  create,
  list,
};

export default urlsApi;