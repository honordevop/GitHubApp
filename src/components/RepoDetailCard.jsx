import React, { useState } from "react";
import UpdateRepo from "./UpdateRepo";
import { toast } from "react-toastify";

const RepoDetailCard = ({ data, reFetchHandler }) => {
  const [showUpdateRepoForm, setShowUpdateRepoForm] = useState(false);

  const closeUpdateRepoForm = () => {
    setShowUpdateRepoForm(false);
    reFetchHandler();
  };
  return (
    <div className="w-[100vw] flex flex-col items-center">
      <div className="container text-wrap">
        <a href="/" className="font-bold p-2 text-xl bg-black mt-10 text-white">
          Home
        </a>
        <div className="mt-10 w-full">
          <p className="text-2xl font-bold p-5 glass w-full mb-10">
            Repository Name: {data?.name}
          </p>

          <div className="flex flex-row gap-5 mb-5">
            <button
              className="bg-green-700 rounded-md px-4 border-none py-2 text-white text-xs md:text-base font-semibold"
              onClick={() => setShowUpdateRepoForm(true)}
            >
              Update
            </button>

            <div
              className="bg-red-700 rounded-md px-4 py-2 text-white font-semibold cursor-pointer text-xs md:text-base border-none"
              onClick={() => toast.warn("Wow so easy!")}
            >
              Delete
            </div>
          </div>

          <div className="w-full glass flex flex-col gap-5 p-5">
            <div className="flex gap-3 bg-white p-2 shadow-md">
              <p>Created At: </p>
              <p>{data?.created_at}</p>
            </div>
            <div className="flex gap-3 bg-white p-2 shadow-md">
              <p>Repo ID: </p>
              <p>{data?.id}</p>
            </div>
            <div className="flex gap-3 bg-white p-2 shadow-md">
              <p>Description: </p>
              <p>{data?.description}</p>
            </div>
            <div className="flex gap-3 bg-white p-2 shadow-md overflow-hidden">
              <p>Language: </p>
              <p>
                {data?.language
                  ? `${data?.language} programming language(s)`
                  : "Not detectable Automatically"}
              </p>
            </div>
            <div className="flex gap-3 bg-white p-2 shadow-md overflow-hidden">
              <p>Default Branch: </p>
              <p>{data?.default_branch}</p>
            </div>
            <div className="flex gap-3 bg-white p-2 shadow-md overflow-hidden">
              <p className="text-nowrap">Clone URL: </p>
              <p>{data?.clone_url}</p>
            </div>
            <div className="flex gap-3 bg-white p-2 shadow-md overflow-hidden">
              <p>Download URL: </p>
              <p>{data?.downloads_url}</p>
            </div>

            <div className="flex gap-3 bg-white p-2 shadow-md overflow-hidden">
              <p className="text-nowrap">Fork URL: </p>
              <p>{data?.forks_url}</p>
            </div>

            <div className="flex gap-3 bg-white p-2 shadow-md">
              <p>Fork Count: </p>
              <p>{data?.forks_count}</p>
            </div>
          </div>
        </div>
        {showUpdateRepoForm && (
          <UpdateRepo
            closeUpdateRepoForm={closeUpdateRepoForm}
            data={data}
            // reFetchHandler={reFetchHandler}
          />
        )}
      </div>
    </div>
  );
};

export default RepoDetailCard;
