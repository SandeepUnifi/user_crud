import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AddRoleProps = {
  onAddRole: (role: any) => void;
  onClose: () => void;
};

const AddRole: React.FC<AddRoleProps> = ({ onAddRole, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = () => {
    const newRole = {
      id: new Date().toISOString(),
      name,
      description,
      isDisabled,
      createdBy: "current_user", // Replace with actual user data
      createdOn: new Date().toISOString(),
      updatedOn: new Date().toISOString(),
    };
    onAddRole(newRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <h3 className="text-lg font-semibold mb-4">Add Role</h3>
        <Input
          placeholder="Role Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4"
        />
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4"
        />
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={isDisabled}
            onChange={(e) => setIsDisabled(e.target.checked)}
            className="mr-2"
          />
          Disabled
        </label>
        <div className="flex justify-end space-x-2">
          <Button onClick={handleSubmit}>Add Role</Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddRole;
