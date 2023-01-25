import React from 'react';
import { searchUsers } from '../apiService/api-service';

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
            setSearch(false);
          }}
          onChange={(e) => handleSearch(e)}
        ></input>
      </div>
      <div className="fixed top-10 bg-neutral-800 w-[20%] px-2 py-2">
        {searchResponse.map((user: any) => {
          return (
            <div className="flex flex-row">
              <img
                src={user.profile_pic_path}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <p>{user.username}</p>
                <p>{user.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
