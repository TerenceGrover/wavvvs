import axios from 'axios';
const { REACT_APP_BACKEND_HOST } = process.env;
const baseURL = REACT_APP_BACKEND_HOST;

const postTrack = async (selectedFile, userID = 'mateopresa') => {
  try {
    const formData = new FormData();
    formData.append('track', selectedFile);
    const result = await axios.post(`${baseURL}/${userID}/tracks`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return result.data;
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const getUser = async (user) => {
  try {
    const result = await fetch(baseURL + `/${user}`).then((res) => res.json());
    return result;
  } catch (error) {
    console.log({ error });
    return error;
  }
};
const getTracksFromBackend = async () => {
  try {
    const result = await fetch(baseURL + `/alltracks`).then((res) =>
      res.json()
    );
    return result;
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const deleteTrack = async (id) => {
  try {
    const result = await fetch(baseURL + `/delete/tracks/${id}`, {
      method: 'DELETE',
    }).then((res) => res.json());
    return result;
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const getUserTracks = async (username) => {
  try {
    const result = await fetch(baseURL + `/${username}/tracks`).then((res) =>
      res.json()
    );
    return result;
  } catch (error) {
    console.log({ error });
    return error;
  }
};

export { postTrack, getUser, getTracksFromBackend, deleteTrack, getUserTracks };
