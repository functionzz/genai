import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define the type for the file data
interface FileData {
  file_name: string;
  public_url: string;
  size: number;
  file_type: string;
  creation_time: string;
  update_time: string;
}

function StoragePage() {
  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the backend
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/storage");
        console.log(response)
        if (!response.ok) {
          throw new Error("Failed to fetch files");
        }
        const data = await response.json();
        setFiles(data.files);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch files");
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Storage Page</h1>
      <Table>
        <TableCaption>A list of files in the /guru folder.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>File Name</TableHead>
            <TableHead>Public URL</TableHead>
            <TableHead>Size (Bytes)</TableHead>
            <TableHead>File Type</TableHead>
            <TableHead>Creation Time</TableHead>
            <TableHead>Update Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.file_name}>
              <TableCell className="font-medium">{file.file_name}</TableCell>
              <TableCell>
                <a
                  href={file.public_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {file.public_url}
                </a>
              </TableCell>
              <TableCell>{file.size}</TableCell>
              <TableCell>{file.file_type}</TableCell>
              <TableCell>{file.creation_time}</TableCell>
              <TableCell>{file.update_time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total Files</TableCell>
            <TableCell className="text-right">{files.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default StoragePage;