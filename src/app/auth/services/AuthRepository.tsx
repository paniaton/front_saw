import axios from "axios";
import environment from "environment/environment";

export const useAuthRepository = () => {
  const login = async (x: { email: string; password: string }) => {
    const res = await axios.post(`${environment.backEnd}/login`, {
      username: x.email,
      password: x.password,
    });
    return res.data;
  };

  return {
    login,
  };
};
