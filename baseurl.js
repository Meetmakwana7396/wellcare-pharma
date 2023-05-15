import axios from "axios";

export const URL = "http://localhost:3001/";
export const auth_code = "wellcarepharma123";

export const uploadImage = (img) => {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      formData.append("picture", img);
      axios({
        method: "post",
        url: `${URL}api/upload-image`,
        data: formData,
      })
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };
