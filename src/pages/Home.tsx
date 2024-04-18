import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import homeImage from "../assets/background/home.jpg";
import ArticleCard from "../components/ArticleCard";
import HomeCard from "../components/HomeCard";
import NavBar from "../components/NavBar";
import useArticles from "../hooks/useArticles";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import BackgroundImage from "../components/BackgroundImage";
import { IArticle } from "../models/article.model";
import { useEffect } from "react";

const ARTICLE_URL = "/articles/";

export default function Home() {
  const [articles, setArticles]: [
    IArticle[],
    React.Dispatch<React.SetStateAction<IArticle[]>>
  ] = useArticles();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  function handleAdd() {
    navigate("/add");
  }

  async function handleDeleteArticle(articleId: string) {
    const newArticles = articles.filter(
      (article: IArticle) => article._id !== articleId
    );
    setArticles(newArticles);

    try {
      await axiosPrivate.delete(ARTICLE_URL + articleId);
    } catch (err: any) {
      if (!err.response) {
        console.log("No server response");
      }
    }
  }

  return (
    <>
      <NavBar />

      <BackgroundImage />

      <div
        style={{
          backgroundImage: `url(${homeImage})`,
          height: "80vh",
        }}
        className="flex justify-center items-end"
      >
        <HomeCard />
      </div>

      <div className="flex justify-center mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:w-9/12">
          {articles.map((article: IArticle) => (
            <ArticleCard
              article={article}
              handleDeleteArticle={handleDeleteArticle}
              key={article._id}
            />
          ))}
        </div>
      </div>

      <div
        className="btn bg-black text-white md:text-5xl text-2xl fixed z-50 md:bottom-10 md:right-16 right-3 bottom-3 btn-circle hover:text-black hover:bg-white md:w-20 md:h-20 w-16 h-16"
        onClick={() => handleAdd()}
      >
        <FontAwesomeIcon icon={fas.faPlus} />
      </div>

      <Footer />
    </>
  );
}
