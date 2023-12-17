import React from "react";
import { Controller } from "react-hook-form";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { IRadioOptions } from "../../../interfaces";
import "./RadioInput.scss";
type InputProps = {
  label: string;
  id: string;
  name: string;
  control: any;
  options: IRadioOptions[];
  disabled?: boolean;
  error?: any;
};

const RadioInput = ({
  label,
  id,
  name,
  control,
  error,
  options,
  disabled,
}: InputProps) => {
  return (
    <div className="RadioInput">
      <FormLabel id={`${id}-label`} className="d-flex" disabled={disabled}>
        {label}
      </FormLabel>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        disabled={disabled}
        render={({ field }) => (
          <RadioGroup
            {...field}
            aria-label={label}
            name={name}
            onBlur={field.onBlur} // Trigger onBlur validation
          >
            {options?.map((option: IRadioOptions) => (
              <FormControlLabel
                value={option?.value}
                control={<Radio />}
                label={option?.label}
                disabled={disabled}
              />
            ))}
          </RadioGroup>
        )}
      />
      {error && <p className="MuiFormHelperText-root Mui-error">{error}</p>}
    </div>
  );
};

export default RadioInput;
