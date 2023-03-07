import { useLoaderData, Link } from "react-router-dom";
import { getPet } from "../api/index";

export default function PetPage() {
  let pet = useLoaderData();
  
  return (
    <div className="pet-page">
      {pet ? (
        <ul>
          {pet.map((p) => (
            <div key={p.name}>
                <div to={`${p.id}`}>{p.name}</div>
            </div>
            
          ))}
          <div>==================</div>
          <h3><b>Public Route Pet Information:</b></h3>
          {pet.map((p) => (
            <div key={p.name}>
                <div to={`${p.id}`}>{p.name} is a {p.species}</div>
            </div>
            
          ))}

        </ul>
      ) : (
        <div>This is the pet page</div>
      )}
    </div>
  );
}