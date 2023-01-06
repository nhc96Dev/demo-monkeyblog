import Heading from "components/layout/Heading";
import PostItemSmallGridSkeleton from "components/loading/PostItemSmallGridSkeleton";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import PostFeatureItem from "module/post/PostFeatureItem";
import React, { useEffect, useState } from "react";

const HomeFeature = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", true),
      limit(3)
    );
    onSnapshot(queries, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
    });
  }, []);
  return (
    <div className="home-block">
      <div className="container">
        <Heading>Featured posts</Heading>
        {posts.length > 0 ? (
          <div className="grid-layout">
            {posts.map((post) => (
              <PostFeatureItem key={post.id} data={post}></PostFeatureItem>
            ))}
          </div>
        ) : (
          <PostItemSmallGridSkeleton></PostItemSmallGridSkeleton>
        )}
      </div>
    </div>
  );
};
// Example of error boundary
export default HomeFeature;
