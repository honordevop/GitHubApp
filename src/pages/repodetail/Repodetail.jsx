import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../../utils/store";
import RepoDetailCard from "../../components/RepoDetailCard";

const Repodetail = () => {
  const { id } = useParams();

  const [repoDetails, setRepoDetails] = useState([]);

  const singleRepoUrl = `GET /repositories/${id}`;

  useEffect(() => {
    fetchData(singleRepoUrl, setRepoDetails);
  }, [singleRepoUrl]);

  console.log(repoDetails);

  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }

  if (!repoDetails) {
    return <div>Repo not found</div>;
  }

  return (
    <div className="w-[100vw] flex flex-col items-center mb-10">
      <RepoDetailCard data={repoDetails} />
    </div>
  );
};

export default Repodetail;
