import { BackToTopButton } from "components/backToTopButton";
import Heading from "components/layout/Heading";
import Layout from "components/layout/Layout";
import PostItemStyleListSkeleton from "components/loading/PostItemStyleListSkeleton";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import PostItemStyleList from "module/post/PostItemStyleList";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AuthorPostPage = () => {
  const [posts, setPosts] = useState([]);
  const [limitPost, setLimitPost] = useState(5);
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const docRef = query(
        collection(db, "posts"),
        where("user.username", "==", params.slug),
        limit(limitPost)
      );
      onSnapshot(docRef, (snapshot) => {
        const results = [];
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
  }, [params.slug, limitPost]);
  useEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight =
        e.target.documentElement.scrollTop + window.innerHeight;

      if (currentHeight + 100 >= scrollHeight) {
        setLimitPost(limitPost + 5);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [limitPost]);
  useEffect(() => {
    document.title = "Author Page";
  }, []);
  return (
    <div className="h-screen flex flex-col">
      <Layout>
        <div className="container">
          <div className="pt-10 max-w-[1000px] mx-auto">
            <Heading>Các bài viết của: "{params.slug}"</Heading>
            {posts.length > 0 ? (
              posts.map((item) => (
                <PostItemStyleList
                  key={item.id}
                  data={item}
                ></PostItemStyleList>
              ))
            ) : (
              <PostItemStyleListSkeleton></PostItemStyleListSkeleton>
            )}
          </div>
        </div>
        <BackToTopButton></BackToTopButton>
      </Layout>
    </div>
  );
};

export default AuthorPostPage;
