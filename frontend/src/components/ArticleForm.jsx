import styles from "./ArticleForm.module.css";
import { useState } from "react";
import articlesApi from "../api/articlesApi";

const INITIAL_FORM_DATA = {
  title: "",
  content: "",
  file: null,
};

export default function ArticleForm({ fetchArticles }) {
  const [inputData, setInputData] = useState(INITIAL_FORM_DATA);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setInputData(INITIAL_FORM_DATA);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", inputData.title);
    formData.append("content", inputData.content);

    if (inputData.file) {
      formData.append("file", inputData.file);
    }

    try {
      await articlesApi.postArticle(formData);
      fetchArticles();
      resetForm();
    } catch (error) {
      console.error("ERROR : ", error);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    // input 관리 state 업데이트
    // file 데이터 추가
    setInputData((prev) => ({ ...prev, file }));
  };

  return (
    <div className={styles.articleFormContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          id="title"
          name="title"
          value={inputData.title}
          onChange={handleFormChange}
          placeholder="제목"
          className={styles.input}
        />
        <textarea
          id="content"
          name="content"
          value={inputData.content}
          onChange={handleFormChange}
          placeholder="내용"
          className={styles.textarea}
        />
        <input type="file" id="file" name="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" className={styles.button}>
          게시글 작성
        </button>
      </form>
    </div>
  );
}
