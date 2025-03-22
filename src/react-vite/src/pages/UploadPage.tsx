import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
// import GoogleStorageFileUploader from "@/components/GoogleStorageFileUploader";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

function UploadPage() {
  const [url, setUrl] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

  
  const handleFilesUploaded = (files) => {
    console.log("Uploaded files:", files);
    setFiles(files);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {

    console.log(files);
    

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();

      formData.append("file", files[i]);
      const response = await fetch(import.meta.env.VITE_FLASK_URL + "/upload", {
        method: "POST",
        body: formData,
      });

      const responseWithBody = await response.json();
      if (response) setUrl(responseWithBody.publicUrl);
    }
    
  };

  return (
    <ScrollArea>
      <div className="flex items-center justify-center h-full p-6">
        <Card className="w-full max-w-lg p-6">
          <h2 className="text-2xl font-medium mb-4">Upload your Files Here</h2>
          <FileUpload onFilesUploaded={handleFilesUploaded} />
          <Button onClick={handleSubmit}>Submit</Button>
        </Card>
      </div>
    </ScrollArea>
  );
}

export default UploadPage;
