import axios from 'axios';

const imageKitUrl = "https://upload.imagekit.io/api/v1/files/upload";
const authEndpoint = `${import.meta.env.VITE_API_BACKEND_URL}/image`;
const publicKey = "public_H+DpeRbktD9PNybblai4CYtHvGg=";

export const uploadToImageKit = async (file) => {
    try {
      const { data } = await axios.get(authEndpoint);
      if (!data?.token || !data?.signature || !data?.expire) {
        throw new Error("Invalid authentication data from server.");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      formData.append("token", data.token);
      formData.append("expire", data.expire);
      formData.append("signature", data.signature);
      formData.append("publicKey", publicKey);

      const response = await axios.post(imageKitUrl, formData);
      console.log(response.data.url);

      return response.data.url;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw new Error("Failed to upload image. Please try again.");
    }
  };
