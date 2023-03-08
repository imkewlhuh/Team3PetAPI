import { useLoaderData } from "react-router-dom";

export default function PetPage() {
  let pet = useLoaderData();
  
  return (
    <div className="pet-page">
      {pet ? (
        <ul>
          <h3><b>All Pets Information:</b></h3>
          {pet.map((p) => (
            <div key={p.name}>
                <div to={`${p.id}`}>{p.name}</div>
            </div>
            
          ))}
          <div>==================</div>
          
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