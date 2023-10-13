import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const steps = [
  {
    label: "Mettre une image",
  },
  {
    label: "Créer un titre",
  },
  {
    label: "Créer votre recette",
  },
];

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function Card() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedFile, setSelectedFile] = React.useState(null); // État pour stocker le fichier sélectionné

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedFile(null); // Réinitialisez également le fichier sélectionné
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const InputFileUpload = () => {
    return (
      <div>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput
            type="file"
            accept="image/*" // Spécifiez le type de fichiers que vous souhaitez accepter (images ici)
            onChange={handleFileChange}
          />
        </Button>
        {selectedFile && (
          <div>
            <Typography variant="body1">
              File selected: {selectedFile.name}
            </Typography>
          </div>
        )}
      </div>
    );
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  {index === 0 ? (
                    <InputFileUpload />
                  ) : (
                    <TextField
                      className="text"
                      id="outlined-multiline-static"
                      label={step.label}
                      multiline
                      rows={4}
                      defaultValue="Default Value"
                    />
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export default Card;
