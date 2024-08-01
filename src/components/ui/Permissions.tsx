import React, { useState } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddPermission from "./AddPermission";
import ConfirmationDialog from "./ConfirmationDialog";

const initialData: Permission[] = [
  {
    id: "1",
    name: "View Users",
    resources: ["Users"],
    actions: ["read own", "read any"],
  },
  {
    id: "2",
    name: "Edit Users",
    resources: ["Users"],
    actions: ["update own", "update any"],
  },
];

export type Permission = {
  id: string;
  name: string;
  resources: string[];
  actions: string[];
};

export const columns: ColumnDef<Permission>[] = [
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const permission = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => alert(`Edit ${permission.name}`)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => openDeleteConfirmation(permission.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "resources",
    header: "Resources",
    cell: ({ row }) => row.original.resources.join(", "),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => row.original.actions.join(", "),
  },
];

export function Permissions() {
  const [data, setData] = useState<Permission[]>(initialData);
  const [isAddPermissionOpen, setIsAddPermissionOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [permissionIdToDelete, setPermissionIdToDelete] = useState<
    string | null
  >(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleAddPermission = (newPermission: Permission) => {
    setData((prevData) => [...prevData, newPermission]);
    setIsAddPermissionOpen(false);
  };

  const openDeleteConfirmation = (permissionId: string) => {
    setPermissionIdToDelete(permissionId);
    setIsDeleteConfirmationOpen(true);
  };

  const handleDeletePermission = () => {
    if (permissionIdToDelete) {
      setData((prevData) =>
        prevData.filter((permission) => permission.id !== permissionIdToDelete)
      );
      setIsDeleteConfirmationOpen(false);
      setPermissionIdToDelete(null);
    }
  };

  return (
    <div className="p-2">
      <div className="flex justify-between items-center py-4">
        <Input
          placeholder="Search..."
          value={table.getState().globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => setIsAddPermissionOpen(true)}>ADD</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
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
      {isAddPermissionOpen && (
        <AddPermission
          onAddPermission={handleAddPermission}
          onClose={() => setIsAddPermissionOpen(false)}
        />
      )}
      {isDeleteConfirmationOpen && (
        <ConfirmationDialog
          title="Delete Permission"
          description="Are you sure you want to delete this permission?"
          onConfirm={handleDeletePermission}
          onCancel={() => setIsDeleteConfirmationOpen(false)}
        />
      )}
    </div>
  );
}
