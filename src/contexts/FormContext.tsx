import { createContext, useContext, useState } from "react";
import { FormData } from "../types";

type FormContextType = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  resetForm: () => void;
  validate: () => boolean;
  formErrors: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  photo: null,
  gender: "male",
  email: "",
  mobileNo: "",
  dateOfBirth: "",
  city: "New York",
  skills: [],
};

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState({});

  const resetForm = () => {
    setFormData(initialFormData)
    setFormErrors({})
  }

  const validate = () => {
    let errors: any = {};
    Object.entries(formData).forEach(([name, value]: any) => {
      if ((Array.isArray(value) && value.length === 0) || !value) {
        errors[name] = `Required`;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length > 0;
  };

  const validateField = (name: string, value: any) => {
    setFormErrors(prevErrors => (
      {
        ...prevErrors,
        [name]: (Array.isArray(value) && value.length === 0) || !value ? 'Required' : ''
      }
    ))
  }


  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;

      setFormData((prevData) => {
        const updatedValue = checkbox.checked
          ? [...prevData.skills, value]
          : prevData.skills.filter((skill) => skill !== value)
        validateField(name, updatedValue)

        return {
          ...prevData,
          [name]: updatedValue,
        }
      });
    } else if (type === "file") {
      const target = e.target as HTMLInputElement;
      const file: any = target.files ? target.files[0] : null;
      const url = URL.createObjectURL(file);
      if (file) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: url,
        }));
      }
      validateField(name, url)
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      validateField(name, value)
    }
  };


  return (
    <FormContext.Provider
      value={{ formData, setFormData, resetForm, validate, formErrors, handleInputChange }}
    >
      {children}
    </FormContext.Provider>
  );
};
