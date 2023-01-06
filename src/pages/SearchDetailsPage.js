import Header from "components/layout/Header";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostItemStyleList from "module/post/PostItemStyleList";
import { BackToTopButton } from "components/backToTopButton";

const SearchDetailsPage = () => {
  const [posts, setPosts] = useState([]);
  const { slug } = useParams();
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      const newRef = query(
        colRef,
        where("title", ">=", slug),
        where("title", "<=", slug + "utf8")
      );

      onSnapshot(newRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(results);
      });
    }
    fetchData();
  }, [slug]);
  useEffect(() => {
    document.title = "Search Page";
  }, []);
  return (
    <div>
      <Header></Header>
      <div className="container">
        <div className="pt-[60px] max-w-[1000px] mx-auto">
          <h3 className="font-semibold text-2xl">
            Tìm thấy {posts.length} kết quả cho từ khóa "{slug}"
          </h3>
          <div className="pt-[60px]">
            {posts.length > 0 &&
              posts.map((post) => (
                <PostItemStyleList
                  key={post.id}
                  data={post}
                ></PostItemStyleList>
              ))}
          </div>
        </div>
      </div>
      <BackToTopButton></BackToTopButton>
    </div>
  );
};

export default SearchDetailsPage;
