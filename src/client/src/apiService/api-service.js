import axios from 'axios';

const baseURL = 'http://localhost:3001/';

const postTrack = async (selectedFile, userID = 0) => {
  const formData = new FormData();
  formData.append('track', selectedFile);

  const result = await axios.post(`${baseURL}${userID}/tracks`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return result.data;
};


export { postTrack };
