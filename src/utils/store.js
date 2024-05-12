import { octokit } from "./octokit";

export const fetchData = async (url, setFuntion) => {
  const res = await octokit.request(url, {
    //   per_page: 2,
  });

  //   console.log(res.data);
  setFuntion(res.data);
};

export const getObjectById = (data, id) => {
  console.log("called");
  const obj = data.filter((obj) => obj.id === id);
  // setObj(obj);
  console.log(obj);
  return obj;
};
