import axios from "axios"

const API_URL = "http://localhost:8080/pets";


export const getPet = async () => {
    try {

    const response = await axios.get("http://localhost:8080/pets");
    const data = response.data.pets;
    
    console.log("first", data)
  return data;
       

    } catch(e){
        console.log(e);
        return "Failed to fetch pets"
    }
}


export const getPetByUser = async () => {
    try {
        const token = sessionStorage.getItem("token")
        const secondresponse = await axios.get(`http://localhost:8080/pets/user`, {headers: {Authorization: `Bearer ${token}`}}); 
        
        console.log("second response", secondresponse)
        return secondresponse; 

    } catch(e){
        console.log(e);
        return "Failed to fetch owner"
    }
}