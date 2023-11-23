import React, { useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import Button from "../shared/Button";
import Modal from "./Modal";

const UserTable: React.FC = () => {
  const { users, editUser, deleteUser, setIsFormOpen } = useUserContext();
  const [recordToDelete, setRecordToDelete] = useState<number>();

  const handleEdit = (id: number) => {
    editUser(id);
    setIsFormOpen(true);
  };

  const handleDelete = () => {
    if (recordToDelete) deleteUser(recordToDelete);
    setRecordToDelete(undefined);
  };

  return (
    <>
      <Modal open={!!recordToDelete}>
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3
                className="text-base font-semibold leading-6 text-gray-900 capitalize"
                id="modal-title"
              >
                Delete Record
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete the record?
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 flex justify-end sm:px-6 space-x-2">
          <Button onClick={handleDelete}>Yes</Button>
          <Button
            variant="secondary"
            onClick={() => setRecordToDelete(undefined)}
          >
            No
          </Button>
        </div>
      </Modal>
      <div className="overflow-x-auto min-h-screen">
        <table className="w-full text-left text-sm min-w-[1200px]">
          <thead>
            <tr>
              <th className="p-2 border-b border-solid border-gray-400">
                First Name
              </th>
              <th className="p-2 border-b border-solid border-gray-400">
                Last Name
              </th>
              <th className="p-2 border-b border-solid border-gray-400">
                Photo
              </th>
              <th className="p-2 border-b border-solid border-gray-400">
                Gender
              </th>
              <th className="p-2 border-b border-solid border-gray-400">
                Email
              </th>
              <th className="p-2 border-b border-solid border-gray-400">
                Mobile No
              </th>
              <th className="p-2 border-b border-solid border-gray-400">
                Date of Birth
              </th>
              <th className="p-2 border-b border-solid border-gray-400">
                City
              </th>
              <th className="p-2 border-b border-solid border-gray-400">
                Professional Skills
              </th>
              <th className="p-2 border-b border-solid border-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.length === 0 ? (
              <tr className="text-center">
                <td colSpan={10}>No data</td>
              </tr>
            ) : (
              users.map(({ id, data }) => (
                <tr key={id}>
                  <td className="p-2">{data.firstName}</td>
                  <td className="p-2">{data.lastName}</td>
                  <td className="p-2">
                    <img
                      className="w-10 h-10"
                      src={data.photo || ""}
                      alt=""
                      height={100}
                    />
                  </td>
                  <td className="p-2">{data.gender}</td>
                  <td className="p-2">{data.email}</td>
                  <td className="p-2">{data.mobileNo}</td>
                  <td className="p-2">{data.dateOfBirth}</td>
                  <td className="p-2">{data.city}</td>
                  <td className="p-2">
                    <div className="max-w-xs">{data.skills.join(", ")}</div>
                  </td>
                  <td className="p-2">
                    <div className="space-x-2">
                      <Button
                        onClick={() => handleEdit(id)}
                        variant="secondary"
                      >
                        Edit
                      </Button>
                      <Button onClick={() => setRecordToDelete(id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserTable;
