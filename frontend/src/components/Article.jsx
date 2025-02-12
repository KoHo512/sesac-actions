import articlesApi from "../api/articlesApi";
import styles from "./Article.module.css";
import { useNavigate } from "react-router-dom";

export default function Article({ article, isDetail = false }) {
  const navigate = useNavigate();

  const handleDeleteBtn = async (e) => {
    e.preventDefault();

    try {
      await articlesApi.deleteArticle(article.id);
      // navigate("/", { replace: true });
      window.location.href = '/';
    } catch (error) {
      console.error("ERROR : ", error);
    }
  }

  return (
    <div className={styles.articlesContainer}>
      <img src={article.imageUrl} alt={article.originalFileName} width="100px" />
      <div className={styles.titleContent}>
        <h2
          onClick={() => {
            navigate(`/article/${article.id}`);
          }}
          className={`${styles.articleTitle} ${!isDetail && styles.pointer}`}
        >
          {article.title}
        </h2>
        {isDetail && <p className={styles.articleContent}>{article.content}</p>}
      </div>
      <button onClick={handleDeleteBtn} className={styles.deleteBtn}>삭제</button>
    </div>
  );
}
