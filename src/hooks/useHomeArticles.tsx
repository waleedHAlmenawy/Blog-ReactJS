import { useEffect, useState } from "react";
import axios from "../api/axios";
import { IArticle } from "../models/article.model";

const ARTICLE_URL = "/articles/homeCard";

const useHomeArticles = (): [
  IArticle[],
  React.Dispatch<React.SetStateAction<IArticle[]>>
] => {
  const [homeArticles, setHomeArticles]: [
    IArticle[],
    React.Dispatch<React.SetStateAction<IArticle[]>>
  ] = useState([
    {
      _id: "",
      title: "",
      body: "",
      image: "",
      date: "",
      user: {
        _id: "",
        username: "",
        email: "",
        image: "",
        password: "",
      },
    },
  ]);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      if (!homeArticles[0]._id) {
        try {
          const req = await axios.get(ARTICLE_URL);

          const articles = await req.data.map((article: any) => {
            let date = new Date(+article.date);

            let day = `${date.getDate()}`;
            let month = `${date.getMonth() + 1}`;
            let year = `${date.getFullYear()}`;

            if (+day < 10) day = "0" + day;
            if (+month < 10) month = "0" + month;

            article.date = `${day}/${month}/${year}`;

            return article;
          });

          setHomeArticles(articles);
        } catch (err: any) {
          if (!err.response) {
            console.log("No server response");
          }
        }
      }
    })();
  }, []);

  return [homeArticles, setHomeArticles];
};

export default useHomeArticles;
