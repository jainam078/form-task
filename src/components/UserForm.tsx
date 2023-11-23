import React, { FormEvent, useState } from "react";
import { useFormContext } from "../contexts/FormContext";
import { useUserContext } from "../contexts/UserContext";
import Button from "../shared/Button";
import CustomInput from "./CustomInput";
import Modal from "./Modal";

export const UserForm: React.FC<{}> = () => {
  const { formData, setFormData, resetForm, validate, handleInputChange } = useFormContext();
  const { addUser, updateUser, userToEdit, isFormOpen, setIsFormOpen, setUserToEdit } =
    useUserContext();
  const [confirmation, setConfirmation] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hasError = validate();
    if (hasError) return;
    setIsFormOpen(false);
    setConfirmation(userToEdit ? 'update' : 'add')
  };

  const ErrorMessage = ({ name }: { name: string }) => {
    const { formErrors } = useFormContext();
    return <span className="text-red-600 text-sm">{formErrors[name]}</span>;
  };

  const handleAction = () => {
    userToEdit ? updateUser(formData) : addUser(formData);
    setConfirmation('')
  }

  return (
    <>
      <div className="text-right mb-2">
        <Button onClick={() => setIsFormOpen(true)}>Add Record</Button>
      </div>
      <Modal open={!!confirmation}>
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className="text-base font-semibold leading-6 text-gray-900 capitalize" id="modal-title">{confirmation} Record</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">Are you sure you want to {confirmation} the record?</p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 flex justify-end sm:px-6 space-x-2">
          <Button onClick={handleAction}>Yes</Button>
          <Button variant="secondary" onClick={() => {
            setConfirmation('')
            setIsFormOpen(true)
          }}>No</Button>
        </div>
      </Modal>
      <Modal open={isFormOpen}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap items-start -mx-3">
            <div className="sm:w-1/2 w-full px-3">
              <CustomInput
                type="text"
                label="First Name:"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                errorName="firstName"
              />
            </div>
            <div className="sm:w-1/2 w-full px-3">
              <CustomInput
                type="text"
                label="Last Name:"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                errorName="lastName"
              />
            </div>
            <div className="sm:w-1/2 w-full px-3">
              {formData.photo ? (
                <div className="relative inline-block">
                  <img
                    src={formData.photo}
                    alt=""
                    className="w-20 h-20 object-cover"
                  />
                  <button
                    onClick={() =>
                      setFormData((prevData) => ({ ...prevData, photo: null }))
                    }
                    className="absolute -right-2 -top-2 bg-white rounded-full w-6 h-6 text-sm shadow"
                  >
                    X
                  </button>
                </div>
              ) : (
                <CustomInput
                  type="file"
                  label="Photo:"
                  name="photo"
                  accept="image/*"
                  onChange={handleInputChange}
                  errorName="photo"
                  className="text-xs"
                />
              )}
            </div>
            <div className="sm:w-1/2 w-full px-3">
              <div className="mb-2">
                <label className="mb-1 block">Gender:</label>
                <div className="flex space-x-2">
                  <div>
                    <input
                      id="Male"
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={handleInputChange}
                      className="w-4 h-4 align-middle text-blue-600 bg-gray-100 border-gray-300 focus:outline-none"
                    />
                    <label
                      htmlFor="Male"
                      className="ms-2 align-middle font-medium text-gray-900 text-sm"
                    >
                      Male
                    </label>
                  </div>
                  <div>
                    <input
                      id="female"
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleInputChange}
                      className="w-4 h-4 align-middle text-blue-600 bg-gray-100 border-gray-300 focus:outline-none"
                    />
                    <label
                      htmlFor="female"
                      className="ms-2 align-middle font-medium text-gray-900 text-sm"
                    >
                      Female
                    </label>
                  </div>
                  <div>
                    <input
                      id="Other"
                      type="radio"
                      name="gender"
                      value="other"
                      checked={formData.gender === "other"}
                      onChange={handleInputChange}
                      className="w-4 h-4 align-middle text-blue-600 bg-gray-100 border-gray-300 focus:outline-none"
                    />
                    <label
                      htmlFor="Other"
                      className="ms-2 align-middle font-medium text-gray-900 text-sm"
                    >
                      Other
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:w-1/2 w-full px-3">
              <CustomInput
                type="email"
                label="Email:"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                errorName="email"
              />
            </div>
            <div className="sm:w-1/2 w-full px-3">
              <CustomInput
                type="tel"
                name="mobileNo"
                label="Mobile No:"
                pattern="[0-9]{10}"
                value={formData.mobileNo}
                onChange={handleInputChange}
                errorName="mobileNo"
              />
            </div>
            <div className="sm:w-1/2 w-full px-3">
              <CustomInput
                type="date"
                name="dateOfBirth"
                label="Date of Birth:"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                errorName="dateOfBirth"
              />
            </div>
            <div className="sm:w-1/2 w-full px-3">
              <div className="mb-2">
                <label className="mb-1 block">City:</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full border border-solid border-gray-300 p-2 rounded-md focus:outline-none h-10"
                >
                  <option value="New York">New York</option>
                  <option value="London">London</option>
                  <option value="Tokyo">Tokyo</option>
                  <option value="Paris">Paris</option>
                </select>
              </div>
            </div>
            <div className="w-full px-3">
              <label className="mb-1 block">Professional Skills:</label>
              <div className="flex flex-wrap">
                <div className="mb-2 mr-2">
                  <input
                    id="Communication"
                    type="checkbox"
                    name="skills"
                    value="Communication"
                    checked={formData.skills.includes("Communication")}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded align-middle"
                  />
                  <label
                    htmlFor="Communication"
                    className="ms-2 text-sm font-medium text-gray-900 align-middle"
                  >
                    Communication
                  </label>
                </div>
                <div className="mb-2 mr-2">
                  <input
                    id="Thinking"
                    type="checkbox"
                    name="skills"
                    value="Critical Thinking"
                    checked={formData.skills.includes("Critical Thinking")}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded align-middle"
                  />
                  <label
                    htmlFor="Thinking"
                    className="ms-2 text-sm font-medium text-gray-900 align-middle"
                  >
                    Critical Thinking
                  </label>
                </div>
                <div className="mb-2 mr-2">
                  <input
                    id="Solving"
                    type="checkbox"
                    name="skills"
                    value="Problem Solving"
                    checked={formData.skills.includes("Problem Solving")}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded align-middle"
                  />
                  <label
                    htmlFor="Solving"
                    className="ms-2 text-sm font-medium text-gray-900 align-middle"
                  >
                    Problem Solving
                  </label>
                </div>
                <div className="mb-2 mr-2">
                  <input
                    id="Initiative"
                    type="checkbox"
                    name="skills"
                    value="Initiative"
                    checked={formData.skills.includes("Initiative")}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded align-middle"
                  />
                  <label
                    htmlFor="Initiative"
                    className="ms-2 text-sm font-medium text-gray-900 align-middle"
                  >
                    Problem Solving
                  </label>
                </div>
              </div>
              <ErrorMessage name="skills" />
            </div>
          </div>
          <div className="w-full space-x-2 mt-3 border-t border-solid border-gray-200 pt-3">
            <Button type="submit">{userToEdit ? "Update" : "Save"}</Button>
            <Button type="button" onClick={resetForm}>
              Reset
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsFormOpen(false)
                resetForm()
                setUserToEdit(undefined)
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
