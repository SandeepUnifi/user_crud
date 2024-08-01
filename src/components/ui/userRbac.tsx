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
import AddUser from "./AddUser";
import ConfirmationDialog from "./ConfirmationDialog"; // Import the ConfirmationDialog component

const initialData: User[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    timezone: "GMT-5",
    createdBy: "admin",
    isDisabled: false,
    createdOn: "2023-01-01",
    updatedOn: "2023-01-10",
  },
  {
    id: "2",
    firstName: "Alice",
    lastName: "Johnson",
    username: "alicejohnson",
    email: "alice.johnson@example.com",
    phone: "123-456-7891",
    timezone: "GMT-5",
    createdBy: "admin",
    isDisabled: false,
    createdOn: "2023-01-02",
    updatedOn: "2023-01-11",
  },
  {
    id: "3",
    firstName: "Bob",
    lastName: "Williams",
    username: "bobwilliams",
    email: "bob.williams@example.com",
    phone: "123-456-7892",
    timezone: "GMT-5",
    createdBy: "admin",
    isDisabled: false,
    createdOn: "2023-01-03",
    updatedOn: "2023-01-12",
  },
  // Add more sample users as needed
];

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  timezone: string;
  createdBy: string;
  isDisabled: boolean;
  createdOn: string;
  updatedOn: string;
};

export function UserRbac() {
  const [data, setData] = useState<User[]>(initialData);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const handleAddUser = (newUser: User) => {
    setData((prevData) => [...prevData, newUser]);
    setIsAddUserOpen(false);
  };

  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId);
    setIsConfirmDialogOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setData((prevData) =>
        prevData.filter((user) => user.id !== userToDelete)
      );
      setUserToDelete(null);
    }
    setIsConfirmDialogOpen(false);
  };

  const cancelDelete = () => {
    setUserToDelete(null);
    setIsConfirmDialogOpen(false);
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "timezone",
      header: "Timezone",
    },
    {
      accessorKey: "createdBy",
      header: "Created By",
    },
    {
      accessorKey: "isDisabled",
      header: "Is Disabled",
      cell: ({ row }) => (row.original.isDisabled ? "Yes" : "No"),
    },
    {
      accessorKey: "createdOn",
      header: "Created On",
    },
    {
      accessorKey: "updatedOn",
      header: "Updated On",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;

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
              <DropdownMenuItem
                onClick={() => alert(`Edit Details for ${user.id}`)}
              >
                Edit Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => alert(`Edit Password for ${user.id}`)}
              >
                Edit Password
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => alert(`Assign Roles for ${user.id}`)}
              >
                Assign Roles
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDeleteUser(user.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="p-2">
      <div className="flex justify-between items-center py-4">
        <Input
          placeholder="Search..."
          value={table.getState().globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => setIsAddUserOpen(true)}>ADD</Button>
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
            {table.getRowModel().rows.length ? (
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
      {isAddUserOpen && (
        <AddUser
          onAddUser={handleAddUser}
          onClose={() => setIsAddUserOpen(false)}
        />
      )}
      {isConfirmDialogOpen && (
        <ConfirmationDialog
          isOpen={isConfirmDialogOpen}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          message="Please confirm to delete the record."
        />
      )}
    </div>
  );
}
