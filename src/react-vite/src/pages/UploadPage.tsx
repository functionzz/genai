import { Card } from "@/components/ui/card";

function UploadPage() {
    return (
        <div className="flex items-center justify-center h-full p-6">
          <Card className="w-full max-w-lg p-6">
            <h2 className="text-2xl font-medium mb-4">
              Upload your Files Here(Max 10)
            </h2>
            <p className="mb-6">.pdf, .docx, .jpeg, .xlsx</p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <p className="text-gray-500">
                Drag and drop files here or click to browse
              </p>
            </div>
          </Card>
        </div>
      );
}

export default UploadPage;