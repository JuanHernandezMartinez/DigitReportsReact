import axios from "axios";

  export async function consultarEmpresasService(){
    //await api.get("/empresas");

    //const response = await fetch("http://localhost:8080/empresas", {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
    //const response = await axios.get("http://localhost:8080/empresas", { headers:{Authorization:`Bearer ${localStorage.getItem("token")}`} })
    //console.log(await response)

    axios.get("http://localhost:8080/empresas", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => console.log(response.data))
    .catch(error => console.error(error));

  }
