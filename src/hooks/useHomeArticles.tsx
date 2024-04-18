import { useEffect, useState } from "react";
import axios from "../api/axios";

const ARTICLE_URL = "/articles/homeCard";

const useHomeArticles = () => {
  const [homeArticles, setHomeArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      if (!homeArticles[0]) {
        try {
          const req = await axios.get(ARTICLE_URL);

          const articles = req.data.map((article: any) => {
            let date = new Date(+article.date);

            let day = `${date.getDay()}`
            let month = `${date.getMonth()}`
            let year = `${date.getFullYear()}`

            if (+day < 10) day = "0" + day;
            if (+month < 10) month = "0" + month;

            article.date = `${day}/${month}/${year}`;

            return article;
          })

          console.log(articles);
          setHomeArticles(await req.data);
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
