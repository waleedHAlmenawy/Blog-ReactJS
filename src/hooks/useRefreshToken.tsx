import { useCookies } from "react-cookie";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth }: any = useAuth();
  const [cookies] = useCookies();

  const refresh = async () => {
    const token = await cookies.token;
    const userId = await cookies.userId;

    setAuth({ token, userId });

    return token;
  };
  
  return refresh;
};

export default useRefreshToken;
