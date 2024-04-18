import { useEffect, useState } from "react";
import axios from "../api/axios";
import { IArticle } from "../models/article.model";

const ARTICLE_URL = "/articles";

const useArticles = (): [
  IArticle[],
  React.Dispatch<React.SetStateAction<IArticle[]>>
] => {
  const [articles, setArticles]: [
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
      if (!articles[0]) {
        try {
          const req = await axios.get(ARTICLE_URL);
          setArticles(await req.data);
          console.log(req.data);
        } catch (err: any) {
          if (!err.response) {
            console.log("No server response");
          }
        }
      }
    })();
  }, []);

  return [articles, setArticles];
};

export default useArticles;
