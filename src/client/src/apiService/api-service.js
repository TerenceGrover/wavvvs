import axios from 'axios';

const postTrack = async (selectedFile) => {
  const formData = new FormData();
  formData.append('track', selectedFile);

  const result = await axios.post('http://localhost:3001/1/tracks', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return result.data;
};

export {postTrack}