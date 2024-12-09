import axios from "axios";
const axiosInstance = axios.create({
  // Local instance of firebase function
  // baseURL: "http://127.0.0.1:5001/clone-a047b/us-central1/api",

  //Deployed version of amazon server on render.com
  baseURL: "https://amazon-api-deploy-4u96.onrender.com/",
});

export { axiosInstance };
