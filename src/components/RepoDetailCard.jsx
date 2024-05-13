import React from "react";

const RepoDetailCard = ({ data }) => {
  return (
    <div className="w-full">
      <div className="container text-wrap">
        <a href="/" className="font-bold p-2 text-xl bg-black mt-10 text-white">
          Home
        </a>
        <div className="mt-10 w-full">
          <p className="text-2xl font-bold p-5 glass w-full mb-10">
            Repository Name: {data?.name}
          </p>

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
      </div>
    </div>
  );
};

export default RepoDetailCard;
