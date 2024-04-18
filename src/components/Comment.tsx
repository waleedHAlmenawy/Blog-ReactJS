import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import PopupMessage from "./popups/PopupMessage";
import { IComment } from "../models/comment.model";

export default function Comment({
  comment,
  handleDeleteComment,
}: {
  comment: IComment;
  handleDeleteComment: any;
}) {
  const [trigger, setTrigger] = useState(false);

  const { auth }: any = useAuth();

  return (
    <>
      <PopupMessage
        trigger={trigger}
        setTrigger={setTrigger}
        btnName="Delete"
        handleOnClick={() => {
          handleDeleteComment(comment._id);
          setTrigger(false);
        }}
        message="Are you sure you want to delete this comment?"
      />
      <div className="grid grid-cols-4 items-center text-sm mx-4">
        <div className="col-span-2 text-bold text-xs flex justify-start h-full">
          <span>{comment.user.username}</span>
        </div>

        {auth.userId === comment.user._id ? (
          <div className="col-span-2 flex justify-end">
            <div className="dropdown dropdown-end">
              <button title="menu" className="menu " tabIndex={0} role="button">
                <FontAwesomeIcon icon={fas.faEllipsisVertical} />
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content shadow rounded-box text-black bg-white z-50"
              >
                <li>
                  <a
                    className="text-red-700"
                    onClick={() => {
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

        <div className="col-span-4">{comment.body}</div>

        <div
          className="col-span-4 bg-slate-400 rounded mt-2"
          style={{
            height: "1px",
          }}
        />
      </div>
    </>
  );
}
