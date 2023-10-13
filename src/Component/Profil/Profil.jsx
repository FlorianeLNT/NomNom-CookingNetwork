import "./Profil.css";
import Button from "@mui/material/Button";
import EditProfil from "../EditProfil/EditProfil";
import NavBar from "../NavBar/NavBar";

function Profil(props) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  async function userData() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        firstname: firstName,
        lastname: lastName,
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
      <NavBar />
      <div className="my-profile">
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
    </>
  );
}
export default Profil;
