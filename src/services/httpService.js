import axios from "axios";

export const uploadImage = (url, body) => {
    // making api call using axios.
    return axios.post(url, body, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
}