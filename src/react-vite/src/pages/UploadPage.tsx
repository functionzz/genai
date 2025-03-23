import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
// import GoogleStorageFileUploader from "@/components/GoogleStorageFileUploader";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilesUploaded = (newFiles: any) => {
    console.log("Uploaded files:", newFiles);
    setFiles((files) => [...files, ...newFiles]);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(files);
    console.log(e);

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();

      formData.append("file", files[i]);
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to Upload");
      }

    }

    console.log("All uploads completed in order");
    setFiles([]);
    window.location.reload(); // Refresh the page to reflect changes
  };

  return (
    <ScrollArea>
      <div className="w-full p-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Uploads</h1>
          <p className="text-gray-600">
            Update your financial data for Gemini integration.
          </p>
        </div>
        <div className="flex items-center justify-center h-full p-6">
          <Card className="w-full max-w-lg p-6">
            <h2 className="text-2xl font-medium mb-4">
              Upload your Files Here
            </h2>
            <FileUpload onFilesUploaded={handleFilesUploaded} />
            <Button onClick={handleSubmit}>Submit</Button>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}

export default UploadPage;
