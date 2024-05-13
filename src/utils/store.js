import { octokit } from "./octokit";

export const fetchData = async (url, setFuntion) => {
  try {
    const res = await octokit.request(url, {
      //   per_page: 2,
    });

    // if (!res.ok) {
    //   throw new Error("Failed to Data");
    // }
    //   console.log(res.data);
    setFuntion(res.data);
  } catch (error) {
    if (error.status === 404) {
      window.location.href = "/404";
    }
    console.error(error.status);
    // setLoading(false);
    return error;
  }
};

export const getObjectById = (data, id) => {
  console.log("called");
  const obj = data.filter((obj) => obj.id === id);
  // setObj(obj);
  console.log(obj);
  return obj;
};
