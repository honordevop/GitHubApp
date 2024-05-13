import React, { useState } from "react";
import { octokit } from "../utils/octokit";
import { FaRegCheckCircle } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const UpdateRepo = ({ data, closeUpdateRepoForm, reFetchHandler }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentRepoTitle, setCurrentRepoTitle] = useState(data?.name);
  const [currentRepoDesc, setCurrentRepoDesc] = useState(data?.description);
  const [newRepoTitle, setNewRepoTitle] = useState(data?.name);
  const [newRepoDesc, setNewRepoDesc] = useState(data?.description);

  // Update repository details
  async function updateRepo() {
    setLoading(true);
    try {
      const response = await octokit.request("PATCH /repos/:owner/:repo", {
        owner: process.env.REACT_APP_GITHUB_USERNAME,
        repo: currentRepoTitle,
        name: newRepoTitle,
        description: newRepoDesc,
        private: true,
      });

      // console.log(response);
      // reFetchHandler();
      setLoading(false);
      setSuccess(true);
      // console.log("Repository updated:", response.data.html_url);
    } catch (error) {
      toast.warn("Update Error, Refresh Page");
      // console.error("Error updating repository:", error.message);
    }
  }

  const titleChangeHandler = (e) => {
    setNewRepoTitle(e.target.value);
  };

  const descChangeHandler = (e) => {
    setNewRepoDesc(e.target.value);
  };

  const repoUpdateHadler = (e) => {
    e.preventDefault();

    // const newTitle = e.target[0].value;
    // const newDesc = e.target[1].value;

    console.log(newRepoTitle);
    console.log(newRepoDesc);

    updateRepo(newRepoTitle, newRepoDesc);
    // createRepo(title, desc);
  };

  //   if (loading) {
  //     return (
  //       <div className="w-full h-full flex items-center justify-center">
  //         <div>
  //           <ClipLoader
  //             color="#8A005C"
  //             // loading={loading}
  //             // cssOverride={override}
  //             size={150}
  //             aria-label="Loading Spinner"
  //             data-testid="loader"
  //           />
  //         </div>
  //       </div>
  //     );
  //   }

  //   if (success) {
  //     return (
  //       <div className="w-full h-full flex items-center justify-center">
  //         <div className="flex flex-col gap-5">
  //           <FaRegCheckCircle className="text-2xl" />
  //           <div
  //             className="bg-gray-700 rounded-md px-4 py-2 text-white font-semibold cursor-pointer md:text-base"
  //             onClick={() => {
  //               hideCreateFormHandler();
  //               setSuccess(false);
  //             }}
  //           >
  //             Close
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }
  return (
    <div
      className="w-[100vw] h-[100vh] absolute top-0  flex flex-col items-center justify-center bg-[#00000091]"
      // onClick={() => closeUpdateRepoForm()}
    >
      <div className="container glass p-5 h-max z-50">
        {!loading && !success && (
          <form
            action=""
            className="w-[90%] h-max flex flex-col gap-5 "
            onSubmit={repoUpdateHadler}
          >
            <p className="w-full text-center py-2 text-lg font-bold">
              {" "}
              Update existing Repository
            </p>
            <div className="flex flex-col gap-3">
              <label className="font-semibold">Repo Title</label>
              <input
                type="text"
                value={newRepoTitle}
                onChange={titleChangeHandler}
                placeholder="Enter the New Title for your repo"
                className="p-2 outline-none rounded-md"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="font-semibold">Description</label>
              <input
                type="text"
                value={newRepoDesc}
                onChange={descChangeHandler}
                placeholder="Enter New description"
                className="p-2 outline-none rounded-md"
              />
            </div>
            <div className=" flex gap-5">
              <button className="bg-green-700 rounded-md px-4 py-2 text-white font-semibold">
                Update
              </button>

              <div
                className="bg-gray-700 rounded-md px-4 py-2 text-white font-semibold cursor-pointer md:text-base"
                onClick={() => closeUpdateRepoForm()}
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
                Repository Updated Succesfully!!!
              </p>
              <div
                className="bg-gray-700 rounded-md px-4 py-2 text-white font-semibold cursor-pointer md:text-base "
                onClick={() => {
                  closeUpdateRepoForm();
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

export default UpdateRepo;
