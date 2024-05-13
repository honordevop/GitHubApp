import React from "react";

const NotFoundPage = () => {
  return (
    <div className="w-[100vw] h-[400vh] flex text-white">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
        <div className="max-w-lg mx-auto space-y-3 text-center">
          <h3 className=" font-semibold">404 Error</h3>
          <p className=" text-4xl font-semibold sm:text-5xl">Page not found</p>
          <p className="">
            Sorry, the resources you are looking for could not be found or has
            been removed.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/"
              className="block py-2 px-4 text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg"
            >
              Go back
            </a>
            <a
              href="tel:+2348164462713"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-50 font-medium duration-150 active:bg-gray-100 border rounded-lg"
            >
              Contact support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
