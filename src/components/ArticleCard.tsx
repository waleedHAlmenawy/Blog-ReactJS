import { useState } from "react";
import ArticleDetails from "./popups/ArticleDetails";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { IArticle } from "../models/article.model";

export default function ArticleCard({
  article,
  handleDeleteArticle,
}: {
  article: IArticle;
  handleDeleteArticle: any
}) {
  const [popupTrigger, setPopupTrigger] = useState(false);

  return (
    <>
      <div
        className="bg-slate-100 max-w-80 w-fit pb-5 col-span-1 m-auto mt-20 cursor-pointer"
        onClick={() => {
          setPopupTrigger(true);
        }}
      >
        <img
          src={article.image}
          alt="article-img"
          className="col-span-1 hover:scale-125 transition-all"
          style={{
            height: "300px",
            width: "400px",
            objectFit: "cover",
          }}
        />

        <p className="pb-5 text-center font-extrabold text-6xl col-span-1">
          ,,
        </p>

        <p className="m-auto w-40 text-center text-2xl font-light col-span-1">
          {article.title}
        </p>
      </div>

      <ArticleDetails
        trigger={popupTrigger}
        setTrigger={setPopupTrigger}
        handleDeleteArticle={handleDeleteArticle}
        article={article}
      />
    </>
  );
}
