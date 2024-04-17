import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import useUser from "../hooks/useUserProfile";
import { useNavigate } from "react-router-dom";
import PopupMessage from "./popups/PopupMessage";

export default function UserData({
  setArticleTrigger,
  user,
  articleId,
  handleDeleteArticle,
}: {
  setArticleTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  articleId: string;
  handleDeleteArticle: any;
}) {
  const [trigger, setTrigger] = useState(false);
  const [btnSwitch, setBtnSwitch] = useState("");
  const [userProfile]: any = useUser();

  const navigate = useNavigate();

  function handleEdit() {
    navigate("/edit", { state: { articleId } });
  }

  return (
    <>
      <PopupMessage
        trigger={trigger}
        setTrigger={setTrigger}
        handleOnClick={
          btnSwitch === "edit"
            ? () => {
                handleEdit();
              }
            : () => {
                setTrigger(false);
                setArticleTrigger(false);
                handleDeleteArticle(articleId);
              }
        }

        btnName={btnSwitch === "edit" ? "Edit" : "Delete"}
        message={
          btnSwitch === "edit"
            ? "Do you want to edit this article?"
            : "Are you sure you want to delete this article?"
        }
      />

      <div className="grid grid-cols-4 items-center text-sm">
        <div className="col-span-1 flex justify-center">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-32 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={user.image} />
            </div>
          </div>
        </div>

        <div className="text-bold col-span-2 flex justify-start">
          {user.username}
        </div>

        {userProfile._id === user._id ? (
          <div className="col-span-1 flex justify-end mx-4">
            <div className="dropdown dropdown-end">
              <button title="menu" className="menu " tabIndex={0} role="button">
                <FontAwesomeIcon icon={fas.faBars} />
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content shadow rounded-box text-black bg-white"
              >
                <li>
                  <a
                    className="text-green-700"
                    onClick={() => {
                      setBtnSwitch("edit");
                      setTrigger(true);
                    }}
                  >
                    Edit
                  </a>
                  <a
                    className="text-red-700"
                    onClick={() => {
                      setBtnSwitch("delete");
                      setTrigger(true);
                    }}
                  >
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
