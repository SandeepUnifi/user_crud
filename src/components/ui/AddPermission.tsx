import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AddPermissionProps = {
  onAddPermission: (permission: any) => void;
  onClose: () => void;
};

const AddPermission: React.FC<AddPermissionProps> = ({
  onAddPermission,
  onClose,
}) => {
  const [name, setName] = useState("");
  const [resources, setResources] = useState<string[]>([]);
  const [actions, setActions] = useState<string[]>([]);

  const handleSubmit = () => {
    const newPermission = {
      id: new Date().toISOString(),
      name,
      resources,
      actions,
    };
    onAddPermission(newPermission);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <h3 className="text-lg font-semibold mb-4">Add Permission</h3>
        <Input
          placeholder="Permission Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4"
        />
        <div className="mb-4">
          <label className="block mb-2">Select Resources</label>
          <select
            multiple
            value={resources}
            onChange={(e) =>
              setResources(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className="w-full p-2 border rounded"
          >
            <option value="Users">Users</option>
            <option value="Roles">Roles</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Select Actions</label>
          <select
            multiple
            value={actions}
            onChange={(e) =>
              setActions(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className="w-full p-2 border rounded"
          >
            <option value="create own">Create Own</option>
            <option value="read own">Read Own</option>
            <option value="update own">Update Own</option>
            <option value="delete own">Delete Own</option>
            <option value="create any">Create Any</option>
            <option value="read any">Read Any</option>
            <option value="update any">Update Any</option>
            <option value="delete any">Delete Any</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <Button onClick={handleSubmit}>Add Permission</Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddPermission;
