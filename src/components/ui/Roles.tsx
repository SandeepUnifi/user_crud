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
import AddRole from "./AddRole";
import ConfirmationDialog from "./ConfirmationDialog"; // Assuming ConfirmationDialog is in the same directory

const initialData: Role[] = [
  {
    id: "1",
    name: "Admin",
    description: "Administrator role",
    isDisabled: false,
    createdBy: "admin",
    createdOn: "2023-01-01",
    updatedOn: "2023-01-10",
  },
  {
    id: "2",
    name: "Editor",
    description: "Editor role",
    isDisabled: false,
    createdBy: "admin",
    createdOn: "2023-01-02",
    updatedOn: "2023-01-11",
  },
];

export type Role = {
  id: string;
  name: string;
  description: string;
  isDisabled: boolean;
  createdBy: string;
  createdOn: string;
  updatedOn: string;
};

export const columns: ColumnDef<Role>[] = [
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const role = row.original;

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
            <DropdownMenuItem onClick={() => alert(`Edit ${role.name}`)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => openDeleteConfirmation(role.id)}>
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
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "isDisabled",
    header: "Is Disabled",
    cell: ({ row }) => (row.original.isDisabled ? "Yes" : "No"),
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
  },
  {
    accessorKey: "createdOn",
    header: "Created On",
  },
  {
    accessorKey: "updatedOn",
    header: "Updated On",
  },
];

export function Roles() {
  const [data, setData] = useState<Role[]>(initialData);
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [roleIdToDelete, setRoleIdToDelete] = useState<string | null>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleAddRole = (newRole: Role) => {
    setData((prevData) => [...prevData, newRole]);
    setIsAddRoleOpen(false);
  };

  const openDeleteConfirmation = (roleId: string) => {
    setRoleIdToDelete(roleId);
    setIsDeleteConfirmationOpen(true);
  };

  const handleDeleteRole = () => {
    if (roleIdToDelete) {
      setData((prevData) =>
        prevData.filter((role) => role.id !== roleIdToDelete)
      );
      setIsDeleteConfirmationOpen(false);
      setRoleIdToDelete(null);
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
        <Button onClick={() => setIsAddRoleOpen(true)}>ADD</Button>
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
      {isAddRoleOpen && (
        <AddRole
          onAddRole={handleAddRole}
          onClose={() => setIsAddRoleOpen(false)}
        />
      )}
      {isDeleteConfirmationOpen && (
        <ConfirmationDialog
          title="Delete Role"
          description="Are you sure you want to delete this role?"
          onConfirm={handleDeleteRole}
          onCancel={() => setIsDeleteConfirmationOpen(false)}
        />
      )}
    </div>
  );
}
