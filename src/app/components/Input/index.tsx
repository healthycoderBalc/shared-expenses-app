import { useField } from "@unform/core";
import { InputHTMLAttributes, useEffect, useRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input = ({ name, ...rest }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { registerField, fieldName, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <>
      <input ref={inputRef} defaultValue={defaultValue} type="text" {...rest} />
      {error && <span className="text-danger small">{error}</span>}
    </>
  );
};

export default Input;
