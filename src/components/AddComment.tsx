import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IUser } from "../models/user.model";
import { ChangeEvent, ChangeEventHandler, LegacyRef } from "react";

export default function AddComment({
  handleAddComment,
  newComment,
  setNewComment,
  userProfile,
  commentRef,
}: {
  handleAddComment: any;
  newComment: string;
  setNewComment: React.Dispatch<React.SetStateAction<string>>;
  userProfile: IUser;
  commentRef: LegacyRef<HTMLInputElement>;
}) {
  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setNewComment(e.target.value);
  }

  return (
    <div className="grid grid-cols-6 items-center text-sm">
      <div className="col-span-1 flex justify-center">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-8 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={
                userProfile.image
                  ? userProfile.image
                  : "https://blog-nestjs-cryn.onrender.com/profile-image-placeholder.svg"
              }
            />
          </div>
        </div>
      </div>

      <input
        type="text"
        placeholder="Comment Here"
        className="input input-ghost w-full max-w-xs col-span-4 border-none input-xs"
        onChange={handleInput}
        value={newComment}
        ref={commentRef}
      />

      <div className="col-span-1 flex justify-end mx-4">
        <button
          title="menu"
          className="btn btn-ghost text-red-700"
          tabIndex={0}
          role="button"
          onClick={() => handleAddComment()}
        >
          <FontAwesomeIcon icon={fas.faPaperPlane} />
        </button>
      </div>
    </div>
  );
}
