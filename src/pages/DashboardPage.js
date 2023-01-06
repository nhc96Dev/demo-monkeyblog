import { BackToTopButton } from "components/backToTopButton";
import { Button } from "components/button";
// import PostItemStyleListSkeleton from "components/loading/PostItemStyleListSkeleton";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import DashboardHeading from "module/dashboard/DashboardHeading";
import PostItemStyleList from "module/post/PostItemStyleList";
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const { userInfo } = useAuth();
  const [posts, setPosts] = useState([]);
  const [limitPost, setLimitPost] = useState(5);
  useEffect(() => {
    async function fetchData() {
      const docRef = query(
        collection(db, "posts"),
        where("user.id", "==", String(userInfo?.uid)),
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
  }, [userInfo?.uid, limitPost]);

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
    document.title = "Dashboard Page";
  }, []);
  if (!posts) return;
  return (
    <div>
      <DashboardHeading title="Dashboard" desc="Overview dashboard monitor">
        <Button
          kind="ghost"
          to="/manage/add-post"
          className="header-button"
          height="52px"
        >
          Add Post
        </Button>
      </DashboardHeading>
      <h3 className="font-semibold text-lg text-green-500 mb-5">
        Bài viết của tôi:
      </h3>
      <div className="max-w-[800px]">
        {posts.length > 0 &&
          posts.map((item) => (
            <PostItemStyleList key={item.id} data={item}></PostItemStyleList>
          ))}
      </div>
      <BackToTopButton></BackToTopButton>
    </div>
  );
};

export default DashboardPage;
