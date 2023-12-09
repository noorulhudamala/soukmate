import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import "./CheckoutStepper.scss";

type CheckoutStepperProps = {
  activeStep: number;
  setActiveStep: Function;
  steps: string[];
};
export default function CheckoutStepper({
  activeStep,
  setActiveStep,
  steps
}: CheckoutStepperProps) {
  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={"CheckoutStepper"}>
   <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment></React.Fragment>
      )}
      </Stack>
      </div>
  );
}
