import { BackToTopButton } from "components/backToTopButton";
import Heading from "components/layout/Heading";
import Layout from "components/layout/Layout";
import PostItemLargeGridSkeleton from "components/loading/PostItemLargeGridSkeleton";
import PostItemStyleListSkeleton from "components/loading/PostItemStyleListSkeleton";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import BlogFeature from "module/blog/BlogFeature";
import PostItemStyleList from "module/post/PostItemStyleList";
import { useEffect, useState } from "react";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [postFeature, setPostFeature] = useState([]);
  const [limitPost, setLimitPost] = useState(5);

  useEffect(() => {
    const colRef = collection(db, "posts");

    const queriesPostFeature = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", true),
      limit(4)
    );
    onSnapshot(queriesPostFeature, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPostFeature(results);
    });

    const queriesAllPost = query(
      colRef,
      where("status", "==", 1),
      limit(limitPost)
    );
    onSnapshot(queriesAllPost, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
    });
  }, [limitPost]);

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
    document.title = "Blog Page";
  }, []);
  return (
    <Layout>
      <div className="mt-10 mb-10">
        <div className="container">
          <Heading>Feature posts</Heading>
          {posts.length > 0 ? (
            <BlogFeature data={postFeature}></BlogFeature>
          ) : (
            <PostItemLargeGridSkeleton></PostItemLargeGridSkeleton>
          )}
        </div>
        <div className="container">
          <div className="max-w-[1000px] mx-auto">
            <Heading>All posts</Heading>
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostItemStyleList
                  key={post.id}
                  data={post}
                ></PostItemStyleList>
              ))
            ) : (
              <PostItemStyleListSkeleton></PostItemStyleListSkeleton>
            )}
          </div>
        </div>
      </div>
      <BackToTopButton></BackToTopButton>
    </Layout>
  );
};

export default BlogPage;
