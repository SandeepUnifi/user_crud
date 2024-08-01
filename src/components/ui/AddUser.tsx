import React, { useState } from "react";
import { User } from "./userRbac";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type AddUserProps = {
  onAddUser: (user: User) => void;
  onClose: () => void;
};

const AddUser: React.FC<AddUserProps> = ({ onAddUser, onClose }) => {
  const [formData, setFormData] = useState<User>({
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    timezone: "",
    createdBy: "",
    isDisabled: false,
    createdOn: "",
    updatedOn: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddUser({ ...formData, id: Date.now().toString() });
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new user.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <Input
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <Input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <Input
            name="timezone"
            placeholder="Timezone"
            value={formData.timezone}
            onChange={handleChange}
            required
          />
          <Input
            name="createdBy"
            placeholder="Created By"
            value={formData.createdBy}
            onChange={handleChange}
            required
          />
          <div className="flex items-center space-x-2">
            <label htmlFor="isDisabled">Is Disabled:</label>
            <input
              type="checkbox"
              name="isDisabled"
              checked={formData.isDisabled}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isDisabled: e.target.checked,
                }))
              }
            />
          </div>
          <Input
            name="createdOn"
            placeholder="Created On"
            type="date"
            value={formData.createdOn}
            onChange={handleChange}
            required
          />
          <Input
            name="updatedOn"
            placeholder="Updated On"
            type="date"
            value={formData.updatedOn}
            onChange={handleChange}
            required
          />
          <div className="flex space-x-2">
            <Button type="submit">Add User</Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUser;
