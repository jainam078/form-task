import { FC, HTMLAttributes, ReactNode } from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "primary" | "secondary";
  type?: "submit" | "reset" | "button" | undefined;
}

const Button: FC<ButtonProps> = ({
  variant = "primary",
  children,
  ...props
}) => {
  const className =
    variant === "primary"
      ? "inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
      : "inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50";

  return (
    <button type="button" className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
