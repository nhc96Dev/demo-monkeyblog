import styled from "styled-components";
import React, { useEffect, useState } from "react";
import PostRelated from "module/post/PostRelated";
import PostMeta from "module/post/PostMeta";
import PostImage from "module/post/PostImage";
import PostCategory from "module/post/PostCategory";
import PageNotFound from "./PageNotFound";
import Layout from "components/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "contexts/auth-context";
import { userRole } from "utils/constants";

import slugify from "slugify";
import { ActionDelete, ActionEdit } from "components/action";
import Swal from "sweetalert2";
import { AuthorBox } from "components/author";
import { BackToTopButton } from "components/backToTopButton";
import { ShowContentPost } from "components/editor";

const PostDetailsPageStyles = styled.div`
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }

  @media screen and (max-width: 1023.98px) {
    .post {
      &-header {
        flex-direction: column;
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
      &-content {
        margin: 40px 0;
      }
    }
  }
`;

const PostDetailsPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState({});

  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          doc.data() &&
            setPostInfo({
              id: doc.id,
              ...doc.data(),
            });
        });
      });
    }
    fetchData();
  }, [slug]);
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]);
  const { userInfo } = useAuth();
  if (!slug) return <PageNotFound></PageNotFound>;
  if (!postInfo.title) return null;
  const { user } = postInfo;

  const date = postInfo?.createdAt?.seconds
    ? new Date(postInfo?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");

  async function handleDeletePost(postId) {
    const docRef = doc(db, "posts", postId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(docRef);
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
        navigate("/dashboard");
      } else {
        Swal.fire("Failed!", "You have no right to delete post", "warning");
      }
    });
  }
  return (
    <PostDetailsPageStyles>
      <Layout>
        <div className="container">
          <div className="post-header">
            <PostImage
              url={postInfo.image}
              className="post-feature"
            ></PostImage>
            <div className="post-info">
              <PostCategory className="mb-6" to={postInfo.category?.slug}>
                {postInfo.category?.name}
              </PostCategory>
              <h1 className="post-heading">{postInfo.title}</h1>
              <PostMeta
                authorName={postInfo.user?.fullname}
                date={formatDate}
                to={slugify(postInfo.user?.username || "", { lower: true })}
              ></PostMeta>

              <div className="flex items-center gap-x-5 mt-5">
                {postInfo?.user?.id === String(userInfo?.uid) && (
                  <span className="p-2 bg-primary rounded-md font-semibold text-white">
                    Bài viết của tôi
                  </span>
                )}
                {(userInfo?.role === userRole.ADMIN ||
                  userInfo?.role === userRole.MOD ||
                  postInfo?.user?.id === String(userInfo?.uid)) && (
                  <ActionEdit
                    onClick={() =>
                      navigate(`/manage/update-post?id=${postInfo.id}`)
                    }
                  ></ActionEdit>
                )}

                {(userInfo?.role === userRole.ADMIN ||
                  userInfo?.role === userRole.MOD ||
                  postInfo?.user?.id === String(userInfo?.uid)) && (
                  <ActionDelete
                    onClick={() => handleDeletePost(postInfo.id)}
                  ></ActionDelete>
                )}
              </div>
            </div>
          </div>
          <div className="post-content">
            <ShowContentPost content={postInfo.content}></ShowContentPost>

            <AuthorBox userId={user.id}></AuthorBox>
          </div>
          <PostRelated categoryId={postInfo?.category?.id}></PostRelated>
        </div>
      </Layout>
      <BackToTopButton></BackToTopButton>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;
