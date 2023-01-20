import { CurrentUser, InfoObject, AdditionalInfoObject } from '../Interfaces';
const baseURL = 'http://localhost:3001';

const postTrack = async (
  selectedFile: File,
  setter: Function,
  userID = 'mateopresa'
) => {
  try {
    const formData = new FormData();
    formData.append('track', selectedFile);
    return fetch(baseURL + `/${userID}/tracks`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setter((currentUser: { tracks: any }) => ({
          ...currentUser,
          tracks: [...currentUser.tracks, data],
        }));
      });
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const getUser = (user: string): any => {
  try {
    return fetch(baseURL + `/users`, {
      method: 'GET',
      body: JSON.stringify({ username: user }),
    }).then((res) => {
      console.log(res);
      res.json();
    });
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const getTracksFromBackend = () => {
  try {
    return fetch(baseURL + `/alltracks`).then((res) => res.json());
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const deleteTrack = (id: string) => {
  try {
    return fetch(baseURL + `/delete/tracks/${id}`, {
      method: 'DELETE',
    }).then((res) => res.json());
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const getUserTracks = (
  username: string,
  setter: React.Dispatch<React.SetStateAction<CurrentUser | undefined>>
) => {
  try {
    const userData = getUser(username);
    return fetch(baseURL + `/${username}/tracks`)
      .then((res) => res.json())
      .then((data) =>
        setter((currentUser) => ({
          ...currentUser,
          ...userData,
          tracks: [...data],
        }))
      );
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const login = (infoObject: InfoObject) => {
  const { username, password } = infoObject;
  let user = { username, password };
  try {
    return fetch(baseURL + `/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
      },
      body: JSON.stringify(user),
    }).then((res) => res.json());
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const register = (infoObject: InfoObject) => {
  const { email, username, password } = infoObject;
  let user = { email, username, password };
  try {
    return fetch(baseURL + `/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
      },
      body: JSON.stringify(user),
    }).then((res) => res.json());
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const updateUser = (secondObject: AdditionalInfoObject) => {
  const { name, bio, email, profile_pic_path } = secondObject;
  let user = { name, bio, email, profile_pic_path };
  try {
    return fetch(baseURL + `/update`, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
      },
      body: JSON.stringify(user),
    }).then((res) => res.json());
  } catch (error) {
    console.log({ error });
    return error;
  }
};

export {
  postTrack,
  getUser,
  getTracksFromBackend,
  deleteTrack,
  getUserTracks,
  login,
  register,
  updateUser,
};
