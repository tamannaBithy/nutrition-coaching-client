import { jwtDecode } from "jwt-decode";

export async function login(reqBody) {
  try {
    let response = await fetch("http://localhost:8000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailOrPhone: reqBody.emailOrPhone,
        password: reqBody.password,
      }),
    });
    const data = await response.json();

    let userData = {};

    if (data?.accessToken) {
      const accessToken = data?.accessToken;

      // Remove 'Bearer ' prefix
      const tokenWithoutBearer = accessToken.slice(7);

      // Decode the JWT
      const decodedToken = jwtDecode(tokenWithoutBearer);

      userData._id = decodedToken?._id;
      userData.email = decodedToken?.email;
      userData.phone = decodedToken?.phone;
      userData.role = decodedToken?.role;
      userData["auth"] = accessToken;

      return userData;
    } else {
      return data;
    }
  } catch (error) {
    throw new Error(`Failed to logged in user: ${error.message}`);
  }
}

export async function socialLogin(email) {
  try {
    let response = await fetch("http://localhost:8000/api/v1/socialLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();

    let userData = {};

    if (data?.accessToken) {
      const accessToken = data?.accessToken;

      // Remove 'Bearer ' prefix
      const tokenWithoutBearer = accessToken.slice(7);

      // Decode the JWT
      const decodedToken = jwtDecode(tokenWithoutBearer);

      userData._id = decodedToken?._id;
      userData.email = decodedToken?.email;
      userData.phone = decodedToken?.phone;
      userData.role = decodedToken?.role;
      userData["auth"] = accessToken;

      return userData;
    } else {
      return data;
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to register user: ${error.message}`);
  }
}
