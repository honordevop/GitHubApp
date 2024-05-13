import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../../utils/store";
import RepoDetailCard from "../../components/RepoDetailCard";
import { BounceLoader } from "react-spinners";

const Repodetail = () => {
  const { id } = useParams();

  const [repoDetails, setRepoDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const singleRepoUrl = `GET /repositories/${id}`;

  useEffect(() => {
    fetchData(singleRepoUrl, setRepoDetails);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, [singleRepoUrl]);

  console.log(repoDetails);

  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }

  if (!repoDetails) {
    return <div>Repo not found</div>;
  }

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
    <div className="w-[100vw] flex flex-col items-center mb-10">
      <RepoDetailCard data={repoDetails} />
    </div>
  );
};

export default Repodetail;
