import type { InfoObject, AdditionalInfoObject } from '../Interfaces';
const baseURL = 'http://192.168.1.187:3001';


const login = async (infoObject: InfoObject): Promise<any> => {
  const { email, password } = infoObject;
  let user = { email, password };
  try {
    return fetch(baseURL + `/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        return data;
      });
  } catch (error) {
    console.log({ error });
    return Promise.reject(error);
  }
};

const register = async (infoObject: InfoObject): Promise<JSON> => {
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

const updateUser = async (
  secondObject: AdditionalInfoObject
): Promise<number> => {
  const { name, bio, email, profile_pic_path } = secondObject;
  let user = { name, bio, email, profile_pic_path };
  try {
    return fetch(baseURL + `/me`, {
      method: 'PUT',
      headers: {
        'Content-type': 'Application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.status)
      .then((data) => {
        console.log(data);
        return data;
      });
  } catch (error) {
    console.log({ error });
    return Promise.reject(error);
  }
};

const checkUser = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    return fetch(baseURL + `/user`, {
      method: 'GET',
      headers: {
        'Content-type': 'Application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data;
      });
  }
};

const postTrack = async (trackURL: string, name: string) => {
  try {
    return fetch(baseURL + `/user/tracks`, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({ url: trackURL, title: name }),
    }).then((res) => res.json());
  } catch (error) {
    console.log({ error });
    return Promise.reject(error);
  }
};

const deleteTrack = async (id: string) => {
  try {
    return fetch(baseURL + `/track`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'Application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({ id: id }),
    }).then((res) => res.text());
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const getAllUsers = async (sort : string) => {
  try {
    return fetch(baseURL + `/users/all`, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body : JSON.stringify({sort})
    }).then((res) => res.json());
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const deleteAccount  = async (password : string) => {
  try {
    return fetch(baseURL + `/user`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'Application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({ password: password }),
    }).then(
      (res) => 
      res.status
      );
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const getAllTracks = async (sort : string) => {
  console.log(sort)
  try {
    return fetch(baseURL + `/tracks/all`, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body : JSON.stringify( sort !== '' ? {sort, limit : 10} : {limit : 10})
    }).then((res) => res.json());
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const getIndividualUser = async (id: string) => {
  try {
    return fetch(baseURL + `/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'Application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }).then((res) => res.json());
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const followUser = async (id: string) => {
  try {
    console.log(id)
    return fetch(baseURL + `/user/follow`, {
      method: 'PUT',
      headers: {
        'Content-type': 'Application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({ id: id }),
    }).then((res) => res.status);
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const likeTrack = async (id: string) => {
  try {
    return fetch(baseURL + `/track/like`, {
      method: 'PUT',
      headers: {
        'Content-type': 'Application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({ trackId: id }),
    }).then((res) => res.status);
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const searchUsers = async (search : string) => {
  try {
    return fetch(baseURL + `/search/${search}`, {
      method: 'GET',
      headers: {
        'Content-type': 'Application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    }).then((res) => res.json());
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const buyPremium = async () => {
  try {
    return fetch(baseURL + `/premium`, {
      method: 'PUT',
      headers: {
        'Content-type': 'Application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body : JSON.stringify({duration : 12})
    }).then((res) => res.status);
  } catch (error) {
    console.log({ error });
    return error;
  }
};

export {
  postTrack,
  deleteTrack,
  login,
  register,
  updateUser,
  checkUser,
  getAllUsers,
  deleteAccount,
  getAllTracks,
  getIndividualUser,
  followUser,
  likeTrack,
  searchUsers,
  buyPremium
};
