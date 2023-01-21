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

const login = async (infoObject: InfoObject) : Promise<any> => {
  const { email, password } = infoObject;
  let user = { email, password };
  try {
    return fetch(baseURL + `/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
      },
      body: JSON.stringify(user),
    }).then((res) => res.json())
    .then((data) => {
      console.log(data)
      if (data.token){
        localStorage.setItem('token', data.token)
      }
      return data
    })
  } catch (error) {
    console.log({ error });
    return Promise.reject(error);
  }
};

const register = async (infoObject: InfoObject)  : Promise<JSON> => {
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
    return Promise.reject(error);
  }
};

const updateUser = async (secondObject: AdditionalInfoObject) : Promise<number> => {
  const { name, bio, email, profile_pic_path } = secondObject;
  let user = { name, bio, email, profile_pic_path };
  try {
    return fetch(baseURL + `/me`, {
      method: 'PUT',
      headers: {
        'Content-type': 'Application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(user),
    }).then((res) => res.status)
    .then((data) => {
      console.log(data)
      return data
    })
  }
    catch (error) {
    console.log({ error });
    return Promise.reject(error);
  }
};

const checkUser = async () => {
  const token = localStorage.getItem('token')
  if (token){
    return fetch(baseURL + `/user`, {
      method: 'GET',
      headers: {
        'Content-type': 'Application/json',
        'Authorization': 'Bearer ' + token
      },
    }).then((res) => res.json())
  }
}

export {
  postTrack,
  getUser,
  getTracksFromBackend,
  deleteTrack,
  getUserTracks,
  login,
  register,
  updateUser,
  checkUser
};
