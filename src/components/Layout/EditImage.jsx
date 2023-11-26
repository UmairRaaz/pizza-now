import Image from "next/image";
import React from "react";

const EditImage = ({ link, setLink }) => {
  const apiURl = process.env.API_URL
  const handleProfileInfo = async (e) => {
    e.preventDefault();
    setprofileSaved(false);
    setprofileSaving(true);
    const response = await fetch(`${apiURl}/api/profile`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: userName,
        phone,
        postalCode,
        city,
        country,
        streetAddress,
      }),
    });
    setprofileSaving(false);
    if (response.ok) {
      setprofileSaved(true);
    }
  };
  return (
    <>
      {link && (
        <Image
          className="rounded-lg w-full h-full mb-1"
          src={link}
          width={250}
          height={250}
          alt={"avatar"}
        />
      )}
      {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleProfileInfo} />
        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
          Change image
        </span>
      </label>
    </>
  );
};

export default EditImage;
