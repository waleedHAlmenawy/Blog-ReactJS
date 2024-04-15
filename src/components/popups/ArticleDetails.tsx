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
  article: any;
  handleDeleteArticle: any;
}) {
  /* User Auth */
  const { auth }: any = useAuth();
  const [userProfile]: any = useUserProfile();

  /* Likes */
  const [isLiked, setIsLiked]: any = useState(false);
  const [likes, setLikes]: any = useState();

  /* Comments */
  const [newComment, setNewComment]: any = useState();
  const [comments, setComments]: any = useState();
  const commentRef: any = useRef();

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    (async function () {
      try {
        const likesReq = await axiosPrivate.get(LIKES_URL + article._id);
        setLikes(await likesReq.data);

        const commentsReq = await axiosPrivate.get(COMMENTS_URL + article._id);
        setComments(await commentsReq.data);

        console.log(comments);
      } catch (err: any) {
        if (!err.response) {
          console.log("No server response");
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

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  async function handleLikes() {
    if (!auth.token) {
      navigate("/login");
    }

    if (isLiked) {
      const newLikes = likes.filter((like: any) => like.user !== auth.userId);

      setLikes(newLikes);
    } else {
      const newLikes = [...likes, { user: auth.userId }];
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
        { user: userProfile, body: newComment, article: article._id },
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

  async function handleDeleteComment(commentId: any) {
    const newComments = comments.filter(
      (comment: any) => comment._id !== commentId
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
                    commentRef.current.focus();
                  }}
                >
                  Comment
                </button>
              </section>

              <div className="line"></div>

              <section className="comments-section">
                {comments.map((comment: any) => {
                  return (
                    <Comment
                      comment={comment}
                      handleDeleteComment={handleDeleteComment}
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
