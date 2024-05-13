import React, { useEffect, useState } from "react";
import ReposList from "../../components/ReposList";
import { fetchData } from "../../utils/store";
import { BounceLoader } from "react-spinners";
import CreateRepo from "../../components/CreateRepo";

const Home = () => {
  const [profile, setProfile] = useState([]);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [showCreateRepoForm, setShowCreateRepoForm] = useState(false);
  const [filterWord, setFilterWord] = useState("");
  const profileUrl = "GET /users/honordevop";

  //   fetchDate(repoUrl);
  //   const resp = await fetchDate(profileUrl)
  useEffect(() => {
    fetchData(profileUrl, setProfile);
  }, [profileUrl]);

  useEffect(() => {
    const timestamp = Date.now();
    const repoUrl = "GET /users/honordevop/repos?_=" + timestamp;

    fetchData(repoUrl, setRepos);

    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, [refresh]);

  //   console.log(profile);
  //   console.log(repos);
  //   fetchDate(profileUrl, setProfile);

  const onchageHandler = (e) => {
    setFilterWord(e.target.value);
    // console.log(filterWord);
  };
  function filterByLang(array, filterWord) {
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

  const reFetchHandler = () => {
    // console.log("called");
    setRefresh((prev) => !prev);
    console.log(refresh);
  };
  const hideCreateFormHandler = () => {
    setShowCreateRepoForm(false);
    // console.log("clicked");
  };

  const handleFilter = (e) => {
    e.preventDefault();
    // const filterWord = e.target[0].value;
    // console.log(filterWord);
    const filterResult = filterByLang(repos, filterWord);
    // console.log(filterResult);
    if (filterResult) {
      setRepos(filterResult);
    } else {
      return;
    }
  };

  if (loading) {
    return (
      <div className="w-[100vw] h-screen flex items-center justify-center">
        <div>
          {/* <ThreeCircles
            visible={true}
            height="100"
            width="100"
            color="#8a005c"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          /> */}
          <BounceLoader className="" size={80} color="#8A005C" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-[100vw] flex flex-col items-center ">
      <div className="container">
        <div className="my-10 w-full flex flex-col items-center gap-5">
          <img
            src={profile.avatar_url}
            alt={`${profile.name} picture`}
            className="w-[200px] h-[200px] rounded-[100px]"
          />
          <div className="bg-[#b6c1fc] p-5 md:text-xl font-semibold rounded-md w-full flex flex-col gap-3 md:gap-5">
            <p className="">
              <span className="p-1 bg-white shadow-md">Fullname: </span>
              {profile.name}
            </p>
            <p>
              <span className="p-1 bg-white shadow-md">Bio:</span> {profile.bio}
            </p>
            <p>
              <span className="p-1 bg-white shadow-md">GitHub:</span>{" "}
              {profile.html_url}
            </p>
            <p>
              <span className="p-1 bg-white shadow-md">Date Joined:</span>{" "}
              {profile.created_at}
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
            Filter Repo by Language
          </label>
          <div className=" flex flex-col md:flex-row gap-6 mt-4">
            <input
              onChange={onchageHandler}
              type="text"
              placeholder="Enter programming language"
              className="p-2 outline-none rounded-md"
            />
            <div className="flex flex-row gap-5">
              <button className="bg-green-700 rounded-md px-4 py-2 text-white text-xs md:text-base font-semibold">
                Filter
              </button>

              <div
                className="bg-gray-700 rounded-md px-4 py-2 text-white font-semibold cursor-pointer text-xs md:text-base"
                onClick={() => setRefresh((prev) => !prev)}
              >
                Clear Filter
              </div>

              <div
                className="bg-gray-700 rounded-md px-2 md:px-4 py-2 text-white font-semibold cursor-pointer text-xs md:text-base"
                onClick={() => setShowCreateRepoForm(true)}
              >
                Create New Repo
              </div>
            </div>
          </div>
        </form>
        <ReposList repos={repos} />

        {showCreateRepoForm && (
          <CreateRepo
            hideCreateFormHandler={hideCreateFormHandler}
            reFetchHandler={reFetchHandler}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
