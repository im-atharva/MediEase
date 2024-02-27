import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config.js";

const DocumentUpload = () => {
  const [file, setFile] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    getImages();
  }, []); // Fetch images only once when component mounts

  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${BASE_URL}/users/profile/me/documents`, formData);
      getImages(); // After uploading, refresh the list of images
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const getImages = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/users/profile/me/documents`
      );
      setImages(response.data.images);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <div className="my-10">
      <div className="flex justify-center h-[70px] ">
        <input
          type="file"
          className="border-2 border-gray-400 "
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          type="button"
          className="bg-blue-500 h-[60px] w-[100px] text-lg p-4 text-white rounded-md hover:bg-white hover:text-blue-500 hover:border-2 border-blue-500"
          onClick={upload}
        >
          Upload
        </button>
      </div>

      <table className="border-collapse mx-auto my-20 w-[80%] bg-[#fafdf6]">
        <thead>
          <tr className="border border-gray-400">
            <th className="border border-gray-400 p-2 text-[22px]">Name</th>
            <th className="border border-gray-400 p-2 ">View Document</th>
          </tr>
        </thead>
        <tbody>
          {images.map((item, index) => (
            <tr key={item._id}>
              <td className="border-b-2 border-l-2 border-gray-400 p-4 text-[18px] text-center">
                {item.name.split(" ")[0]}
              </td>
              <td className="border-b-2 border-r-2 border-gray-400 p-4 text-center">
                <a
                  href={`${BASE_URL}/docs/${encodeURIComponent(item.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-800"
                >
                  View Document
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentUpload;
