import React, { useState } from "react";

interface FileData {
  preview: string;
  data: File;
}

function GoogleStorageFileUploader() {
  const [url, setUrl] = useState<string>("");
  const [file, setFile] = useState<FileData | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append("file", file.data);
    }
    const response = await fetch("http://localhost:5001/upload-file-to-cloud-storage", {
      method: "POST",
      body: formData,
    });
    const responseWithBody = await response.json();
    if (response) setUrl(responseWithBody.publicUrl);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const img: FileData = {
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      };
      setFile(img);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="file" onChange={handleFileChange}></input>
      <button type="submit">Submit</button>
    </form>
  );
}

export default GoogleStorageFileUploader;