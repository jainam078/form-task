import { useFormContext } from "../contexts/FormContext";

const ErrorMessage = ({ name }: { name: string }) => {
  const { formErrors } = useFormContext();
  return <span className="text-red-600 text-sm">{formErrors[name]}</span>;
};

const CustomInput = ({ ...props }) => {
  return (
    <div className="mb-2">
      <label className="mb-1 block">{props.label}</label>
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className={`w-full border border-solid border-gray-300 p-2 rounded-md focus:outline-none h-10 ${props.className}`}
      />
      <ErrorMessage name={props.errorName} />
    </div>
  );
};

export default CustomInput;
