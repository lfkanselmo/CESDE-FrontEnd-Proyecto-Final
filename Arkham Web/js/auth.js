let email = document.querySelector(".email");
let password = document.querySelector(".contrasena");

urlLogin = "http://localhost:8090/api/auth/login";

let datosLogin = {
  email: email.value,
  password: password.value,
};

const config = () => {
  return {
    headers: {
      Authorization: sessionStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  };
};

/*

fetch(urlLogin, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

*/

let token = async () => {
  try {
    return await axios.post(urlLogin, datosLogin);
  } catch (error) {
    console.error(error);
    throw error;
  }
  return null;
};

console.log(token);
