import React, { useEffect, useState } from "react";
import ReposList from "../../components/ReposList";
import { fetchData, getObjectById } from "../../utils/store";

const Home = () => {
  const [profile, setProfile] = useState([]);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [filterWord, setFilterWord] = useState("");
  const repoUrl = "GET /users/honordevop/repos";
  const profileUrl = "GET /users/honordevop";

  //   fetchDate(repoUrl);
  //   const resp = await fetchDate(profileUrl)
  useEffect(() => {
    fetchData(profileUrl, setProfile);
  }, [profileUrl]);

  useEffect(() => {
    fetchData(repoUrl, setRepos);
  }, [repoUrl, refresh]);

  //   console.log(profile);
  //   console.log(repos);
  //   fetchDate(profileUrl, setProfile);

  const onchageHandler = (e) => {
    setFilterWord(e.target.value);
    console.log(filterWord);
  };
  function filterByName(array, filterWord) {
    if (filterWord.trim().length !== 0) {
      const lowercaseLanguage = filterWord.trim().toLowerCase();
      return array.filter(
        (item) =>
          item.language && item.language.toLowerCase() === lowercaseLanguage
      );
    } else {
      return;
    }
  }

  const handleFilter = (e) => {
    e.preventDefault();
    // const filterWord = e.target[0].value;
    // console.log(filterWord);
    const filterResult = filterByName(repos, filterWord);
    // console.log(filterResult);
    if (filterResult) {
      setRepos(filterResult);
    } else {
      return;
    }
  };

  const viewLeaveHandler = (data, id) => {
    const repo = getObjectById(data, id);
    console.log(repo);
    // setLeaveObj(leave);
    // showViewLeave();
  };

  return (
    <div className="w-[100vw] flex flex-col items-center">
      <div className="container">
        <div className="my-10 w-full flex flex-col items-center gap-5">
          <img
            src={profile.avatar_url}
            alt={`${profile.name} picture`}
            className="w-[200px] h-[200px] rounded-[100px]"
          />
          <div className="bg-[#b6c1fc] p-5 md:text-xl font-semibold rounded-md w-full flex flex-col gap-5">
            <p className="">
              <span className="p-1 bg-white shadow-md">Fullname: </span>
              {profile.name}
            </p>
            <p>
              <span className="p-1 bg-white shadow-md">Bio:</span> {profile.bio}
            </p>
            <p>
              <span className="p-1 bg-white shadow-md">Date Joined:</span>{" "}
              {profile.created_at}
            </p>
            <p>
              <span className="p-1 bg-white shadow-md">Last Commit On:</span>{" "}
              {profile.updated_at}{" "}
            </p>
            <p>
              <span className="p-1 bg-white shadow-md">
                Number of Repository:
              </span>{" "}
              {profile.public_repos}
            </p>
          </div>
        </div>
        <form
          action=""
          onSubmit={handleFilter}
          className="w-full glass my-2 p-2"
        >
          <label htmlFor="" className=" font-semibold">
            Filter by Language
          </label>
          <div className=" flex flex-col md:flex-row gap-6 mt-4">
            <input
              onChange={onchageHandler}
              type="text"
              placeholder="Enter programming language"
              className="p-2 outline-none rounded-md"
            />
            <div className="flex flex-row gap-5">
              <button className="bg-green-700 rounded-md px-4 py-2 text-white font-semibold">
                Filter
              </button>

              <div
                className="bg-gray-700 rounded-md px-4 py-2 text-white font-semibold cursor-pointer"
                onClick={() => setRefresh((prev) => !prev)}
              >
                Clear Filter
              </div>
            </div>
          </div>
        </form>
        <ReposList viewLeaveHandler={viewLeaveHandler} repos={repos} />
      </div>
    </div>
  );
};

export default Home;
