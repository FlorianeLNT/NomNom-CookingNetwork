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
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./CreateCard.css";

const steps = [
  // {
  //   label: "Choisissez votre image",
  // },
  {
    label: "Définissez un titre",
  },
  {
    label: "Détaillez votre recette",
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

function CreateCard(props) {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const navigateToHome = () => {
    navigate("/");
  };

  async function handlePublish() {
    if (!token) {
      console.error("Aucun Token trouvé");
      return;
    }
    try {
      const response = await fetch(
        "https://social-network-api.osc-fr1.scalingo.io/nom-nom/post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            // image: image,
            title: title,
            content: content,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur de réseau - ${response.status}`);
      }
      const data = await response.json();
      console.log("Nouveau post créé :", data);
      console.log(title, content);
      {
        navigateToHome();
      }
    } catch (error) {
      console.error("Erreur : " + error);
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedFile(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log("image", file);
  };

  const CreateCard = (step, index) => {
    // if (index === 0) {
    //   return <InputFileUpload />;
    // }
    if (index === 0) {
      return (
        <div>
          <TextField
            className="text"
            id="outlined-multiline-static"
            label={step.label}
            multiline
            rows={4}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={props.title}
          />
        </div>
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
          defaultValue={props.content}
        />
      );
    }
  };

  // const InputFileUpload = () => {
  //   return (
  //     <div>
  //       <Button
  //         component="label"
  //         variant="contained"
  //         startIcon={<CloudUploadIcon />}
  //         sx={{
  //           backgroundColor: "#6b041f",
  //           "&:hover": { backgroundColor: "#921738" },
  //         }}
  //       >
  //         Choisir une image
  //         <VisuallyHiddenInput
  //           type="file"
  //           accept="image/*"
  //           onChange={handleFileChange}
  //         />
  //       </Button>
  //       {selectedFile && (
  //         <div>
  //           <Typography variant="body1">
  //             Image choisie : {selectedFile.name}
  //           </Typography>
  //         </div>
  //       )}
  //     </div>
  //   );
  // };

  return (
    <div>
      <NavBar />
      <Box
        className="createCardDiv"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10vh",
        }}
      >
        <div className="mamie">
          <Stepper
            className="stepCard"
            activeStep={activeStep}
            orientation="vertical"
          >
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
                    <div className="parent">
                      {CreateCard(step, index)}
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{
                          mt: 1,
                          mr: 1,
                          backgroundColor: "#6b041f",
                          "&:hover": { backgroundColor: "#921738" },
                        }}
                      >
                        {index === steps.length - 1 ? "Terminer" : "Continuer"}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{
                          mt: 1,
                          mr: 1,
                          color: "#6b041f",
                          "&:hover": { color: "#921738" },
                        }}
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
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#6b041f",
                  "&:hover": { backgroundColor: "#921738" },
                }}
              >
                Publier
              </Button>
              <Typography variant="body1">{message}</Typography>
              <Button
                onClick={handleReset}
                sx={{
                  mt: 1,
                  mr: 1,
                  color: "#6b041f",
                  "&:hover": { color: "#921738" },
                }}
              >
                Réinitialiser
              </Button>
            </Paper>
          )}
        </div>
      </Box>
    </div>
  );
}

export default CreateCard;
