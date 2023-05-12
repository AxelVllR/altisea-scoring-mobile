import { apiLogin, getProfile } from "../api";

const signIn = async (user) => {
  // this is a mock of an API call, in a real app
  // will be need connect with some real API,
  // send email and password, and if credential is corret
  //the API will resolve with some token and another datas as the below
  const {data} = await apiLogin(user);
  console.log(data.token)
  token = data.token
  console.log(data.token)
  if(data.token) {
    const profile = await getProfile(data.token);
    console.log(profile.data)
    return {
      token,
      ...profile.data
    }
  }
};

export const authService = {
  signIn,
};

const JWTTokenMock =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikx1Y2FzIEdhcmNleiIsImlhdCI6MTUxNjIzOTAyMn0.oK5FZPULfF-nfZmiumDGiufxf10Fe2KiGe9G5Njoa64';
  