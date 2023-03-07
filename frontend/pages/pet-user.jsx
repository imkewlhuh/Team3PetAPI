import { useLoaderData } from "react-router-dom";

export default function PetUser() {
  const userData = useLoaderData();
  const pet = userData.data.pets;
  console.log(userData);

  return (
    <>
    <div className="owner-page">
    
        {pet ? (
       
        <ul>
          {pet.map((p) => (
            <div key={p.name}>
                <div to={`${p.id}`}>{p.name}</div>
            </div>
            
          ))}
          <div>-----------------</div>
          <h3><b>Private Route Pet Information:</b></h3>
          {pet.map((p) => (
            <div key={p.name}>
                <div to={`${p.id}`}>{p.name} is a {p.species}</div>
            </div>
            
          ))}

        </ul>
           
           
      ) : (
        <div>This is the pet owner page</div>
      )}
    </div>

    <h1>{userData.data.name}</h1>  
</>
    
  );
}

