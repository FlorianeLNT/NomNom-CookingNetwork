import "./Profil.css";
import Button from "@mui/material/Button";
import EditProfil from "../EditProfil/EditProfil";

function Profil(props) {
  async function userData() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        age: age,
        occupation: occupation,
      }),
    };
    const response = await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/nom-nom/user",
      options
    );

    const data = await response.json();
  }
  return (
    <>
      <div className="my-profile">
        <div className="profil-info">
          <h1>
            Mon Profil :{" "}
            <Button className="button-modifier" variant="contained">
              Modifier
            </Button>
          </h1>
          <p>Prénom : {props.firstName}</p>
          <p>Nom : {props.lastName} </p>
          <p>Email : {props.email}</p>
          <p>Âge : {props.age}</p>
          <p>Occupation: {props.occupation}</p>
        </div>
      </div>
    </>
  );
}
export default Profil;
