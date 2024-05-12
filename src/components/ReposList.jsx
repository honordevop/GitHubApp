import React, { useEffect, useState } from "react";
import { TbCaretUpDown } from "react-icons/tb";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
// import { getObjectById } from "@/Utils/store";

const headers = [
  { label: "Created On", key: "created_at" },
  { label: "Repo Title", key: "name" },
  { label: "Language", key: "language" },
  { label: "Visibility", key: "visibility" },
  //   { label: "Allows Forking", key: "allow_forking" },
];

const ReposList = ({ viewLeaveHandler, repos }) => {
  // console.log(leave);
  // const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const rowsPerPage = 5;

  useEffect(() => {
    // Generate IDs for each row
    const newData = repos.map((item, index) => ({
      idNum: index + 1,
      ...item,
    }));
    // console.log(newData);
    setData(newData);
  }, [repos]);

  // console.log(data);

  //   const handleSort = () => {
  //     const sortedData = [...data].sort((a, b) => {
  //       if (sortOrder === "asc") {
  //         console.log(Date(a.applicationDate) - new Date(b.applicationDate));
  //         return new Date(a.applicationDate) - new Date(b.applicationDate);
  //       } else {
  //         return new Date(b.applicationDate) - new Date(a.applicationDate);
  //       }
  //     });
  //     setData(sortedData);
  //     setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  //   };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  // console.log(data);
  // console.log(currentRows);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const options = {
    // default is `save`
    method: "save",
    // default is Resolution.MEDIUM = 3, which should be enough, higher values
    // increases the image quality but also the size of the PDF, so be careful
    // using values higher than 10 when having multiple pages generated, it
    // might cause the page to crash or hang.
    resolution: Resolution.HIGH,
    page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.SMALL,
      // default is 'A4'
      format: "letter",
      // default is 'portrait'
      orientation: "landscape",
    },
    canvas: {
      // default is 'image/jpeg' for better size performance
      mimeType: "image/png",
      qualityRatio: 1,
    },
    // Customize any value passed to the jsPDF instance and html2canvas
    // function. You probably will not need this and things can break,
    // so use with caution.
    overrides: {
      // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
      pdf: {
        compress: true,
      },
      // see https://html2canvas.hertzen.com/configuration for more options
      canvas: {
        useCORS: true,
      },
    },
  };

  const getRepoDetails = (id) => {
    navigate(`/repo/${id}`);
  };

  // you can use a function to return the target element besides using React refs
  const getTargetElement = () => document.getElementById("report");

  return (
    <div className="w-full glass p-2 mb-10">
      <p className="text-xl font-bold">List of Repositories</p>
      <div className="overflow-x-scroll h-[270px]" id="report">
        <table className="w-full text-nowrap ">
          <thead>
            <tr>
              <th className="px-4 py-2 cursor-pointer">ID</th>
              <th
                className="px-4 py-2 cursor-pointer flex items-center justify-between"
                // onClick={handleSort}
              >
                Created On <TbCaretUpDown />
              </th>
              <th className="px-4 py-2">Repo Title</th>
              <th className="px-4 py-2">Language</th>
              <th className="px-4 py-2">Visibility</th>
              {/* <th className="px-4 py-2">Allow Forking</th> */}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item, index) => (
              <tr
                key={index}
                onClick={() => getRepoDetails(item.id)}
                className="cursor-pointer"
              >
                <td className="border px-4 py-2">{item.idNum}</td>
                <td className="border px-4 py-2">
                  {item.created_at.slice(0, 10)}
                </td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">
                  {item?.language ? item.language : "Unspecified"}
                </td>
                <td className="border px-4 py-2">{item.visibility}</td>
                {/* <td className="border px-4 py-2">{item.allow_forking}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between w-full">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div>{`Page ${currentPage} of ${totalPages}`}</div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() =>
            paginate(currentPage < totalPages ? currentPage + 1 : totalPages)
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <div className="mt-4 flex items-center justify-between w-full">
        <div className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700">
          <CSVLink data={data} headers={headers} filename={"complaints.csv"}>
            Export to CSV
          </CSVLink>
        </div>
        <button
          className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
          onClick={() => generatePDF(getTargetElement, options)}
        >
          Export to PDF
        </button>
      </div>
    </div>
  );
};

export default ReposList;
