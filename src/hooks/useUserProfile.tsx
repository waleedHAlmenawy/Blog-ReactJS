import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";
import { IUser } from "../models/user.model";

const USER_URL = "/users/profile";

const useUserProfile = (): [
  IUser,
  React.Dispatch<React.SetStateAction<IUser>>
] => {
  const axiosPrivate = useAxiosPrivate();
  const [userProfile, setUserProfile]: [
    IUser,
    React.Dispatch<React.SetStateAction<IUser>>
  ] = useState({
    _id: "",
    username: "",
    email: "",
    image: "",
    password: "",
  });

  const { auth }: any = useAuth();
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      if (!userProfile?.email) {
        try {
          const req = await axiosPrivate.get(USER_URL);
          setUserProfile(req.data);
        } catch (err: any) {
          if (!err.response) {
            console.log("No server response");
          }
        }
      }
    })();
  }, [auth]);

  return [userProfile, setUserProfile];
};

export default useUserProfile;
