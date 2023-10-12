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
import { useState } from "react";

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

function createCard() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedFile, setSelectedFile] = React.useState(null); // État pour stocker le fichier sélectionné
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handlePublish = async (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer" + token,
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    };
    const response = await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/nom-nom/post",
      options
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(`Erreur ${response.status}: ${response.statusText}`);
    }

    if (data.message) {
      setMessage(data.message);
    }
    if (response.status === 200) {
      const token = data.token;
      localStorage.setItem("token", token);
    }
  };

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

  const createCard = (step, index) => {
    if (index === 0) {
      return <InputFileUpload />;
    }
    if (index === 1) {
      return (
        <TextField
          className="text"
          id="outlined-multiline-static"
          label={step.label}
          multiline
          rows={4}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      );
    } else {
      return (
        <TextField
          className="text"
          id="outlined-multiline-static"
          label={step.label}
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      );
    }
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
                  <Typography variant="caption">Dernière étape</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  {createCard(step, index)}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Terminer" : "Continuer"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Retour
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Button
            type="submit"
            onClick={handlePublish}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Publier
          </Button>
          <Typography variant="body1">{message}</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Réinitialiser
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export default createCard;
