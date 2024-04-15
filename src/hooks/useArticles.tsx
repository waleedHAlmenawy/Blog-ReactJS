import { useEffect, useState } from "react";
import axios from "../api/axios";

const ARTICLE_URL = "/articles";

const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      if (!articles[0]) {
        try {
          const req = await axios.get(ARTICLE_URL);
          setArticles(await req.data);
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
