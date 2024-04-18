import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/ArticleDetails.css";
import { fas } from "@fortawesome/free-solid-svg-icons";
import UserData from "../UserData";
import Comment from "../Comment";
import AddComment from "../AddComment";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useRef, useState } from "react";
import useUserProfile from "../../hooks/useUserProfile";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { IUser } from "../../models/user.model";
import { ILike } from "../../models/like.model";
import { IComment } from "../../models/comment.model";
import { IArticle } from "../../models/article.model";

const LIKES_URL = "/likes/";
const COMMENTS_URL = "/comments/";

export default function ArticleDetails({
  trigger,
  setTrigger,
  article,
  handleDeleteArticle,
}: {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  article: IArticle;
  handleDeleteArticle: any;
}) {
  /* User Auth */
  const { auth }: any = useAuth();
  const [userProfile]: [IUser, React.Dispatch<React.SetStateAction<IUser>>] =
    useUserProfile();

  /* Likes */
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes]: [
    ILike[],
    React.Dispatch<React.SetStateAction<ILike[]>>
  ] = useState([
    {
      _id: "",
      article: "",
      user: "",
    },
  ]);

  /* Comments */
  const [newComment, setNewComment]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState("");
  const [comments, setComments]: [
    IComment[],
    React.Dispatch<React.SetStateAction<IComment[]>>
  ] = useState([
    {
      _id: "",
      body: "",
      date: "",
      article: "",
      user: {
        _id: "",
        username: "",
        email: "",
        image: "",
        password: "",
      },
    },
  ]);
  const commentRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    (async function () {
      if (article._id) {
        try {
          const likesReq = await axiosPrivate.get(LIKES_URL + article._id);
          setLikes(await likesReq.data);

          const commentsReq = await axiosPrivate.get(
            COMMENTS_URL + article._id
          );
          setComments(await commentsReq.data);
        } catch (err: any) {
          if (!err.response) {
            console.log("No server response");
          }
        }
      }
    })();
  }, []);

  useEffect(() => {
    setIsLiked(false);

    if (auth.token) {
      likes?.forEach((element: any) => {
        if (element.user === auth.userId) {
          setIsLiked(true);
        }
      });
    }
  }, [likes, auth]);

  async function handleLikes() {
    if (!auth.token) {
      navigate("/login");
    }

    if (isLiked) {
      const newLikes = likes.filter((like: any) => like.user !== auth.userId);
      setLikes(newLikes);
    } else {
      const newLikes = [
        ...likes,
        { user: auth.userId, article: article._id, _id: "" },
      ];
      setLikes(newLikes);
    }

    try {
      await axiosPrivate.post(LIKES_URL + article._id);
    } catch (err: any) {
      if (!err.response) {
        console.log("No server response");
      }
    }
  }

  async function handleAddComment() {
    if (!auth.token) {
      navigate("/login");
    }

    if (newComment) {
      const newComments = [
        {
          user: userProfile,
          body: newComment,
          article: article._id,
          date: "",
          _id: "",
        },
        ...comments,
      ];

      setComments(newComments);
      setNewComment("");

      try {
        await axiosPrivate.post(COMMENTS_URL + article._id, {
          body: newComment,
        });
      } catch (err: any) {
        if (!err.response) {
          console.log("No server response");
        }
      }
    }
  }

  async function handleDeleteComment(commentId: string) {
    const newComments = comments.filter(
      (comment: IComment) => comment._id !== commentId
    );

    setComments(newComments);

    try {
      await axiosPrivate.delete(COMMENTS_URL + article._id + "/" + commentId);
    } catch (err: any) {
      if (!err.response) {
        console.log("No server response");
      }
    }
  }

  return trigger ? (
    <>
      <div className="popup-outer">
        <div className="popup-inner">
          <section className="image-section">
            <button
              title="exit"
              className="exit"
              onClick={() => setTrigger(false)}
            >
              <FontAwesomeIcon icon={fas.faXmark} />
            </button>
            <div className="title drop-shadow text-2xl">{article.title}</div>

            <div
              className="image"
              style={{
                backgroundImage: `url(${article.image})`,
              }}
            ></div>
          </section>

          <section className="data-section bg-slate-200">
            <div className="user-data p-2">
              <UserData
                setArticleTrigger={setTrigger}
                user={article.user}
                articleId={article._id}
                handleDeleteArticle={handleDeleteArticle}
              ></UserData>
            </div>

            <div className="line"></div>

            <div className="body">
              <div className="article-body">{article.body}</div>

              <div className="line"></div>

              <section className="buttons-section -my-3">
                <button
                  onClick={() => handleLikes()}
                  className={
                    isLiked
                      ? "btn btn-ghost text-red-700"
                      : "btn btn-ghost text-black"
                  }
                >
                  Like ({likes.length})
                </button>
                <button
                  className="btn btn-ghost text-black"
                  onClick={() => {
                    commentRef.current?.focus();
                  }}
                >
                  Comment
                </button>
              </section>

              <div className="line"></div>

              <section className="comments-section">
                {comments.map((comment: IComment) => {
                  return (
                    <Comment
                      comment={comment}
                      handleDeleteComment={handleDeleteComment}
                      key={comment._id}
                    />
                  );
                })}
                {comments.length ? (
                  ""
                ) : (
                  <div className="text-center mt-10 text-slate-400 text-2xl">
                    Add First Comment
                  </div>
                )}
              </section>
            </div>
            <div className="add-comment">
              <AddComment
                handleAddComment={handleAddComment}
                newComment={newComment}
                setNewComment={setNewComment}
                userProfile={userProfile}
                commentRef={commentRef}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  ) : (
    ""
  );
}
