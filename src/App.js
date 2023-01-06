import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";

const HomePage = lazy(() => import("pages/HomePage"));
const BlogPage = lazy(() => import("pages/BlogPage"));
const ContactPage = lazy(() => import("pages/ContactPage"));
const SearchDetailsPage = lazy(() => import("pages/SearchDetailsPage"));
const CategoryPage = lazy(() => import("pages/CategoryPage"));
const AuthorPostPage = lazy(() => import("pages/AuthorPostPage"));
const DashboardPage = lazy(() => import("pages/DashboardPage"));
const SignInPage = lazy(() => import("pages/SignInPage"));
const PostDetailsPage = lazy(() => import("pages/PostDetailsPage"));
const PageNotFound = lazy(() => import("pages/PageNotFound"));
const UserUpdate = lazy(() => import("module/user/UserUpdate"));
const UserAddNew = lazy(() => import("module/user/UserAddNew"));
const UserManage = lazy(() => import("module/user/UserManage"));
const UserProfile = lazy(() => import("module/user/UserProfile"));
const PostAddNew = lazy(() => import("module/post/PostAddNew"));
const PostManage = lazy(() => import("module/post/PostManage"));
const PostUpdate = lazy(() => import("module/post/PostUpdate"));
const CategoryAddNew = lazy(() => import("module/category/CategoryAddNew"));
const CategoryManage = lazy(() => import("module/category/CategoryManage"));
const CategoryUpdate = lazy(() => import("module/category/CategoryUpdate"));
const DashboardLayout = lazy(() => import("module/dashboard/DashboardLayout"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));

function App() {
  return (
    <div>
      <AuthProvider>
        <Suspense>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
            <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
            <Route path="/blog" element={<BlogPage></BlogPage>}></Route>
            <Route
              path="/contact"
              element={<ContactPage></ContactPage>}
            ></Route>
            <Route
              path="/search/:slug"
              element={<SearchDetailsPage></SearchDetailsPage>}
            ></Route>
            <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
            <Route
              path="/category/:slug"
              element={<CategoryPage></CategoryPage>}
            ></Route>
            <Route
              path="/author/:slug"
              element={<AuthorPostPage></AuthorPostPage>}
            ></Route>
            <Route
              path="/:slug"
              element={<PostDetailsPage></PostDetailsPage>}
            ></Route>
            <Route element={<DashboardLayout></DashboardLayout>}>
              <Route
                path="/dashboard"
                element={<DashboardPage></DashboardPage>}
              ></Route>
              <Route
                path="/manage/posts"
                element={<PostManage></PostManage>}
              ></Route>
              <Route
                path="/manage/add-post"
                element={<PostAddNew></PostAddNew>}
              ></Route>
              <Route
                path="/manage/update-post"
                element={<PostUpdate></PostUpdate>}
              ></Route>
              <Route
                path="/manage/category"
                element={<CategoryManage></CategoryManage>}
              ></Route>
              <Route
                path="/manage/add-category"
                element={<CategoryAddNew></CategoryAddNew>}
              ></Route>
              <Route
                path="/manage/update-category"
                element={<CategoryUpdate></CategoryUpdate>}
              ></Route>
              <Route
                path="/manage/user"
                element={<UserManage></UserManage>}
              ></Route>
              <Route
                path="/manage/add-user"
                element={<UserAddNew></UserAddNew>}
              ></Route>
              <Route
                path="/manage/update-user"
                element={<UserUpdate></UserUpdate>}
              ></Route>
              <Route
                path="/manage/profile"
                element={<UserProfile></UserProfile>}
              ></Route>
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
