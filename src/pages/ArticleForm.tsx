import { useEffect, useRef, useState } from "react";
import { TITLE_REGEX } from "../regex/article_title";
import { BODY_REGEX } from "../regex/article_body";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ARTICLE_URL = "/articles";

export default function ArticleForm() {
  const articleRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const axiosPrivate = useAxiosPrivate();

  const [title, setTitle] = useState("");
  const [validTitle, setValidTitle] = useState(false);
  const [titleFocus, setTitleFocus] = useState(false);

  const [body, setBody] = useState("");
  const [validBody, setValidBody] = useState(false);
  const [bodyFocus, setBodyFoucs] = useState(false);

  const [image, setImage]: any = useState(
    "https://images.unsplash.com/photo-1712285838110-db4092f03030?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );
  const [showImage, setShowImage]: any = useState(
    "https://blog-nestjs-cryn.onrender.com/article-image-placeholder.jpg"
  );

  useEffect(() => {
    articleRef.current?.focus();

    if (location.pathname === "/edit") {
      (async function () {
        const res = await axiosPrivate.get(
          ARTICLE_URL + "/" + location.state.articleId
        );

        setTitle(res.data.title);
        setBody(res.data.body);
        setShowImage(res.data.image);
        setImage(res.data.image);
      })();
    }
  }, []);

  useEffect(() => {
    const result = TITLE_REGEX.test(title);
    setValidTitle(result);
  }, [title]);

  useEffect(() => {
    const result = BODY_REGEX.test(body);
    setValidBody(result);
  }, [body]);

  function handleChange(e: any) {
    setImage(e.target.files[0]);
    setShowImage(URL.createObjectURL(e.target.files[0]));
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    if (location.pathname === "/add") {
      handleAddArticle();
    } else {
      handleEditArticle();
    }
  }

  async function handleAddArticle() {
    try {
      const articleData = new FormData();

      articleData.append("title", title);
      articleData.append("body", body);
      articleData.append("image", image);

      const res = await axiosPrivate.post(ARTICLE_URL, articleData);
      navigate("/");
    } catch (err: any) {
      if (!err.response) {
        console.log("No server response");
      }
    }
  }

  async function handleEditArticle() {
    try {
      const articleData = new FormData();

      articleData.append("title", title);
      articleData.append("body", body);
      articleData.append("image", image);

      const res = await axiosPrivate.patch(
        ARTICLE_URL + "/" + location.state.articleId,
        articleData
      );

      navigate("/");
    } catch (err: any) {
      if (!err.response) {
        console.log("No server response");
      }
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-8">
        <p className="text-2xl font-bold">
          {location.pathname === "/add" ? "Add New Article" : "Update Article"}
        </p>
        <section className="flex md:flex-row flex-col border border-black p-6 m-6 rounded-3xl">
          <img
            style={{
              height: "400px",
              width: "400px",
              objectFit: "cover",
              borderRadius: "30px",
            }}
            src={showImage}
            alt=""
          />

          <form
            className="flex flex-col justify-between border-black md:border-l-2 md:border-t-0 border-t-2 md:ml-4 md:mt-0 mt-4 p-4"
            onSubmit={handleSubmit}
          >
            <input
              type="file"
              title="upload-article-image"
              className="file-input file-input-ghost w-full"
              onChange={handleChange}
              accept="image/jpeg, image/png, image/jpg"
            />

            <input
              id="large-input"
              type="text"
              ref={articleRef}
              title="title"
              onChange={(e) => setTitle(e.target.value)}
              required
              onFocus={() => setTitleFocus(true)}
              onBlur={() => setTitleFocus(true)}
              className="block w-full p-4 border border-black rounded-lg mt-4"
              placeholder="Write your title here..."
              value={title}
            />

            <p
              id="eidnote"
              className={
                titleFocus && title && !validTitle ? "text-black" : "hidden"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              title must be between 20 and 85 character length
            </p>

            <textarea
              id="body"
              rows={4}
              onChange={(e) => setBody(e.target.value)}
              required
              onFocus={() => setBodyFoucs(true)}
              onBlur={() => setBodyFoucs}
              className="block p-2.5 w-full text-sm border border-black rounded-lg mt-4 h-full"
              placeholder="Write your thoughts here..."
              value={body}
            ></textarea>

            <p
              id="eidnote"
              className={
                bodyFocus && body && !validBody ? "text-black" : "hidden"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              body must be between 50 and 6000 character length
            </p>

            <button
              className=" text-white bg-black mt-2 rounded-lg p-2"
              disabled={!validTitle || !validBody ? true : false}
            >
              {location.pathname === "/add" ? "Add" : "Update"}
            </button>
          </form>
        </section>
      </div>
    </>
  );
}
