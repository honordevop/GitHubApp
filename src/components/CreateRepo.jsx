import React, { useState } from "react";
import { octokit } from "../utils/octokit";
import { FaRegCheckCircle } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

const CreateRepo = ({ hideCreateFormHandler, reFetchHandler }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  // Create a new repository
  async function createRepo(title, desc) {
    setLoading(true);
    try {
      const response = await octokit.request("POST /user/repos", {
        name: `${title}`,
        description: `${desc}`,
        private: false,
      });

      //   console.log(response);
      reFetchHandler();
      setLoading(false);
      setSuccess(true);
      //   console.log("Repository created:", response.data.html_url);
    } catch (error) {
      console.error("Error creating repository:", error.message);
    }
  }

  //   createRepo();

  const repoCreationHadler = (e) => {
    e.preventDefault();

    const title = e.target[0].value;
    const desc = e.target[1].value;

    createRepo(title, desc);
  };

  return (
    <div className="w-[100vw] h-[100vh] absolute top-0  flex flex-col items-center justify-center bg-[#00000091]">
      <div className="container glass p-5 h-max">
        {!loading && !success && (
          <form
            action=""
            className="w-[90%] h-max flex flex-col gap-5 "
            onSubmit={repoCreationHadler}
          >
            <p className="w-full text-center py-2 text-lg">
              {" "}
              Create a New Repository
            </p>
            <div className="flex flex-col gap-3">
              <label className="font-semibold">Repo Title</label>
              <input
                type="text"
                placeholder="Enter the Title of your repo"
                className="p-2 outline-none rounded-md"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="font-semibold">Description</label>
              <input
                type="text"
                placeholder="Enter description"
                className="p-2 outline-none rounded-md"
              />
            </div>
            <div className=" flex gap-5">
              <button className="bg-green-700 rounded-md px-4 py-2 text-white font-semibold">
                Create
              </button>

              <div
                className="bg-gray-700 rounded-md px-4 py-2 text-white font-semibold cursor-pointer md:text-base"
                onClick={() => hideCreateFormHandler()}
              >
                Cancel
              </div>
            </div>
          </form>
        )}
        {loading && !success && (
          <div className="w-full h-full flex items-center justify-center my-12">
            <div>
              <ClipLoader
                color="#8A005C"
                // loading={loading}
                // cssOverride={override}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          </div>
        )}
        {success && (
          <div className="w-full h-full flex items-center justify-center my-14">
            <div className="flex flex-col gap-8 items-center">
              <FaRegCheckCircle className="text-7xl" />
              <p className="font-bold text-xl">
                Repository Created Succesfully!!!
              </p>
              <div
                className="bg-gray-700 rounded-md px-4 py-2 text-white font-semibold cursor-pointer md:text-base "
                onClick={() => {
                  hideCreateFormHandler();
                  setSuccess(false);
                }}
              >
                Close
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateRepo;
