import axios from 'axios';
const { REACT_APP_BACKEND_HOST } = process.env;
const baseURL = REACT_APP_BACKEND_HOST;

const postTrack = async (selectedFile, userID = 'mateopresa') => {
  try {
    const formData = new FormData();
    formData.append('track', selectedFile);
    return fetch(baseURL + `/${userID}/tracks`, {
      method : 'POST',
      body : formData
    }).then(response => response.data)
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const getUser = (user) => {
  try {
    return fetch(baseURL + `/${user}`).then((res) => res.json());
  } catch (error) {
    console.log({ error });
    return error;
  }
};
const getTracksFromBackend = () => {
  try {
    return fetch(baseURL + `/alltracks`).then((res) =>
      res.json()
    );
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const deleteTrack = (id) => {
  try {
    return fetch(baseURL + `/delete/tracks/${id}`, {
      method: 'DELETE',
    }).then((res) => res.json());
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const getUserTracks = (username) => {
  try {
    return fetch(baseURL + `/${username}/tracks`).then((res) =>
      res.json()
    );
  } catch (error) {
    console.log({ error });
    return error;
  }
};

export { postTrack, getUser, getTracksFromBackend, deleteTrack, getUserTracks };
