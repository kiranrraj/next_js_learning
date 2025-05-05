import styles from './InputField.module.css';

type InputFieldProps = {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
};

const InputField = ({
  id,
  label,
  type,
  value,
  onChange,
  required,
  wrapperClassName,
  labelClassName,
  inputClassName,
}: InputFieldProps) => {
  return (
    <div className={wrapperClassName || styles.inputWrapper}>
      <label htmlFor={id} className={labelClassName || styles.label}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className={inputClassName || styles.input}
      />
    </div>
  );
};

export default InputField;
  