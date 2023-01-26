import React from 'react';
import { Link } from 'react-router-dom';
import { searchUsers } from '../apiService/api-service';
import { Context } from '../Utils/Context';

export default function SearchBar(props: {
  setSearch: (arg: boolean) => void;
}) {
  const { setSearch } = props;
  const [searchResponse, setSearchResponse] = React.useState([]);

  React.useEffect(() => {
    if (searchResponse.length > 0) {
      console.log(searchResponse);
    }
  }, [searchResponse]);

  let searchTimeout: any = null;

  const handleSearch = (e: any) => {
    const input = e.target.value;
    clearTimeout(searchTimeout);

    if (!input) return setSearchResponse([]);

    searchTimeout = setTimeout(() => {
      searchUsers(input).then((res) => setSearchResponse(res));
    }, 600);
  };

  return (
    <div>
      <div>
        <input
          autoFocus
          className=" focus:outline-neutral-200 pr-3 pl-3 self-center justify-self-center w-[100%] rounded-md h-[100%] bg-neutral-600"
          onBlur={() => {
            setTimeout(() => {
              setSearch(false);
            }, 100);
          }}
          onChange={(e) => handleSearch(e)}
        ></input>
      </div>
      <div className="fixed top-10 bg-neutral-800 w-[15%] min-w-[220px] px-3 py-2">
        {searchResponse.map((user: any) => {
          return (
              <Link
                to={`/profile/${user.username}`}
                className="flex flex-row items-center content-center gap-x-4"
              >
                <img
                  src={user.profile_pic_path}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">@{user.username}</p>
                  <p>{user.name}</p>
                </div>
              </Link>
          );
        })}
      </div>
    </div>
  );
}
