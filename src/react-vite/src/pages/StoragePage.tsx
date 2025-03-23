"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define the type for the file data
export type FileData = {
  file_name: string;
  size: number;
  file_type: string;
  creation_time: string;
  update_time: string;
};

// Define columns for the data table
export const columns: ColumnDef<FileData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "file_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          File Name
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("file_name")}</div>,
  },
  {
    accessorKey: "size",
    header: "Size (Bytes)",
    cell: ({ row }) => <div>{row.getValue("size")}</div>,
  },
  {
    accessorKey: "file_type",
    header: "File Type",
    cell: ({ row }) => <div>{row.getValue("file_type")}</div>,
  },
  {
    accessorKey: "creation_time",
    header: "Creation Time",
    cell: ({ row }) => <div>{row.getValue("creation_time")}</div>,
  },
  {
    accessorKey: "update_time",
    header: "Update Time",
    cell: ({ row }) => <div>{row.getValue("update_time")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const file = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(file.file_name)}
            >
              Copy file name
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Download file</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function StoragePage() {
  const [data, setData] = React.useState<FileData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Fetch data from the backend
  React.useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/storage");
        if (!response.ok) {
          throw new Error("Failed to fetch files");
        }
        const result = await response.json();
        setData(result.files);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch files");
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Function to delete selected files
  const deleteSelectedFiles = async () => {
    const selectedFiles = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.original.file_name);

    if (selectedFiles.length === 0) {
      alert("No files selected");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/delete-files", {
        method: "DELETE", // Use DELETE method
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ file_names: selectedFiles }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete files");
      }

      // Refresh the file list after deletion
      const result = await response.json();
      alert(result.message);
      window.location.reload(); // Refresh the page to reflect changes
    } catch (err) {
      console.log(err);
      alert("Failed to delete");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Storage</h1>
        <p className="text-gray-600">Organize your financial documents for LLM processing.</p>
      </div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter file names..."
          value={(table.getColumn("file_name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("file_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={deleteSelectedFiles}
          disabled={table.getFilteredSelectedRowModel().rows.length === 0}
        >
          Delete Selected
        </Button>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StoragePage;