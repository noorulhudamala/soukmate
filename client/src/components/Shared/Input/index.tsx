import TextField from "@mui/material/TextField";
import { ChangeEvent } from "react";
import { Controller } from "react-hook-form";
type InputProps = {
  label: string;
  id: string;
  name: string;
  control: any;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
  error?: any;
  value?: string;
  maxLength?: number;
};
const Input = ({
  label,
  id,
  name,
  control,
  error,
  value,
  onChange,
  disabled = false,
  maxLength = 150,
}: InputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      disabled={disabled}
      render={({ field }) => (
        <TextField
          className="m-0"
          {...field}
          fullWidth
          id={id}
          label={label}
          size="small"
          variant="outlined"
          margin="normal"
          error={!!error}
          helperText={error || ""}
          value={value}
          onChange={(e) => onChange(e)}
          inputProps={{
            maxLength: maxLength,
          }}
          onBlur={field.onBlur}
        />
      )}
    />
  );
};

export default Input;
