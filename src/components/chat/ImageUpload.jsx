import React from 'react';

const ImageUpload = ({ image, setImage }) => {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mr-2 flex flex-col items-center">
      <label className="cursor-pointer">
        <span className="inline-block bg-blue-100 dark:bg-blue-800 p-2 rounded-lg text-blue-600 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-700 transition-all">📷</span>
        <input type="file" accept="image/*" className="hidden" onChange={handleChange} />
      </label>
      {image && <img src={image} alt="preview" className="w-10 h-10 object-cover rounded-lg mt-1 border border-blue-300 dark:border-blue-700" />}
    </div>
  );
};

export default ImageUpload; 