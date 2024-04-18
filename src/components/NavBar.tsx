import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUserProfile from "../hooks/useUserProfile";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import PopupMessage from "./popups/PopupMessage";

export default function NavBar() {
  const [userProfile, setUserProfile] = useUserProfile();
  const navigate = useNavigate();
  const { setAuth }: any = useAuth();
  const [, , removeCookie] = useCookies();
  const [trigger, setTrigger] = useState(false);

  const refresh = useRefreshToken();

  useEffect(() => {
    refresh();
  }, []);

  function handleLogout() {
    setAuth({});
    setUserProfile({
      _id: "",
      username: "",
      email: "",
      image: "",
      password: "",
    });
    removeCookie("token");
    removeCookie("userId");
    navigate("/login");
  }

  return (
    <>
      <PopupMessage
        trigger={trigger}
        setTrigger={setTrigger}
        btnName="Logout"
        message="Do you really want to logout?"
        handleOnClick={() => {
          handleLogout();
          setTrigger(false);
        }}
      />

      <div className="flex justify-center absolute w-full">
        <div className="navbar text-gray-100 lg:w-9/12">
          <div className="flex-1">
            <div className="flex w-24 justify-between">
              <a
                href="https://www.linkedin.com/in/waleed-almenawy-154060242/"
                target="_blank"
                rel="noopener noreferrer"
                title="linkedin"
              >
                <FontAwesomeIcon icon={fab.faLinkedinIn} />
              </a>

              <a
                href="https://github.com/waleedHAlmenawy"
                target="_blank"
                rel="noopener noreferrer"
                title="linkedin"
              >
                <FontAwesomeIcon icon={fab.faGithub} />
              </a>

              <a
                href="https://twitter.com/waleed_almenawy"
                target="_blank"
                rel="noopener noreferrer"
                title="linkedin"
              >
                <FontAwesomeIcon icon={fab.faXTwitter} />
              </a>

              <a
                href="https://www.facebook.com/WaleeedAlmenawy"
                target="_blank"
                rel="noopener noreferrer"
                title="linkedin"
              >
                <FontAwesomeIcon icon={fab.faFacebookF} />
              </a>
            </div>
          </div>
          <div className="flex-none">
            <a className="btn btn-ghost text-3xl">Psychopathy</a>
          </div>
          {userProfile._id ? (
            <div className="flex-1 justify-end">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={userProfile.image}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content shadow rounded-box text-red-700 bg-white"
                >
                  <li>
                    <a onClick={() => setTrigger(true)}>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex-1 justify-end">
              <Link to={"/login"}>SIGN IN</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
