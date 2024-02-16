import React, { useState } from "react";

const ImageUpload = ({
  fileHandleChange,
  multiple = false,
  error,
  files,
  removeImage,
}) => {
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    const previews = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      previews.push(URL.createObjectURL(selectedFiles[i]));
    }
    setImagePreviews(previews);
    fileHandleChange(e);
  };

  // Function to remove an image and call the parent component function
  const handleImageRemove = (index) => {
    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);
    removeImage(index); // Call the parent component function to remove from 'files'
  };

  // Update imagePreviews and selectedFiles when files change
  React.useEffect(() => {
    if (files.length === 0) {
      setImagePreviews([]);
    }
  }, [files]);

  return (
    <div>
      <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
        Select Images
      </label>
      <div
        className={`bg-white rounded-lg ${
          error ? " border-red-500  border" : ""
        }`}
      >
        <div
          className={` file_upload p-5 ${
            !error && "border-4"
          } border-dotted border-gray-300 rounded-lg`}
        >
          <svg
            className="text-indigo-500 w-24 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>

          <div className="input_field flex flex-col w-max mx-auto text-center">
            <label>
              <input
                className="text-sm cursor-pointer w-36 hidden"
                type="file"
                multiple={multiple}
                onChange={handleFileChange}
                accept="image/*"
              />
              <div className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover-bg-indigo-500">
                Select
              </div>
            </label>
          </div>
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-sm font-semibold mt-2">
          {error || "Please select at least one image"}
        </p>
      )}
      <div className="mt-4 flex items-center space-x-2">
        {imagePreviews.map((preview, index) => (
          <div key={index} className="relative">
            <img
              src={preview}
              alt={`Selected Image ${index + 1}`}
              className="w-24 h-auto"
            />
            <button
              onClick={() => handleImageRemove(index)}
              className="absolute top-0 right-0 m-1 p-1 bg-red-500 text-white rounded-full cursor-pointer"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
