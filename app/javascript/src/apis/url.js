import axios from "axios";

const create = payload => axios.post("/urls", payload);
const list = () => axios.get("/urls");
const show = slug => axios.get(`/urls/${slug}`);
const update = ({slug, payload}) => axios.patch(`/urls/${slug}`, payload);

const urlsApi = {
  create,
  list,
  show,
  update
};

export default urlsApi;