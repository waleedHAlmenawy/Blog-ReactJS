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
