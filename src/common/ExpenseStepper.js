import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Step1 from "features/steps/Step1";
import Step2 from "features/steps/Step2";
import Step3 from "features/steps/Step3";
// import { makeStyles } from "@mui/styles";

const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];

export default function ExpenseStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  //   const useStyles = makeStyles((theme) => ({
  //     stepper: {
  //       padding: theme.spacing(3), // Increase padding to adjust size
  //     },
  //     // Add more styles as needed
  //   }));

  //   const classes = useStyles();

  return (
    <Box sx={{ width: "100%" }}>
      <div class="w-full flex justify-center">
        <div className="w-4/5">
          <Stepper
            sx={{
              "& .MuiStepper-root": {
                minHeight: "40px",
              },
            }}
            variant="elevation"
            activeStep={activeStep}
          >
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              //   if (isStepOptional(index)) {
              //     labelProps.optional = (
              //       <Typography variant="caption">Optional</Typography>
              //     );
              //   }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step className="" key={label} {...stepProps}>
                  <StepLabel iconContainerStyle={{ width: 36 }} {...labelProps}>
                    {label}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>
      </div>
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
        <React.Fragment>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          <div>
            {activeStep == 0 && <Step1 />}
            {activeStep == 1 && <Step2 />}
            {activeStep == 2 && <Step3 />}
          </div>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
