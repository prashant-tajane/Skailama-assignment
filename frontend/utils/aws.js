import { axiosInstance } from "./axiosInstance";

export const uploadImage = async (img) => {
    let imageUrl = null;
  
    const formdata = new FormData();
    formdata.append("image", img);
  
    try {
      const response = await axiosInstance.post(
        "/widgets/get-upload-url",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      imageUrl = response.data?.uploadURL;
  
      return imageUrl;
    } catch (error) {
      console.error(error);
    }
  };
  