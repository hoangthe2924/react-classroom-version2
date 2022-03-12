import axios from "axios";
import { getToken } from "services/auth.service";

export const DEFAULT_DOMAIN = "https://classrum-api-v2.herokuapp.com";

const token = getToken();
export default axios.create({
  //Change this to the api server when deployed
  baseURL: DEFAULT_DOMAIN,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
