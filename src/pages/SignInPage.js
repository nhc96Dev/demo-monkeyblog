import { Button } from "components/button";
import { Field } from "components/field";
import { Input, InputPasswordToggle } from "components/input";
import { Label } from "components/label";
import { useAuth } from "contexts/auth-context";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import AuthenticationPage from "./AuthenticationPage";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase-app/firebase-config";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});
const SignInPage = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (values) => {
    if (!isValid) return;
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/");
    } catch (error) {
      if (error.message.includes("auth/user-not-found")) {
        toast.warning("Email not found. You can create an account now");
      } else if (error.message.includes("auth/wrong-password")) {
        toast.warning("Wrong password. Please try again");
      }
    }
  };

  useEffect(() => {
    const arrErroes = Object.values(errors);
    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  useEffect(() => {
    document.title = "Login Page";
    if (userInfo?.email) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignIn)}
        // autoComplete="off"
      >
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email address"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>

        <Button
          type="submit"
          className="w-full max-w-[200px] mx-auto mt-[40px] mobile:mt-[30px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Login
        </Button>

        <div className="have-account">
          You have not had an account?{" "}
          <NavLink to={"/sign-up"}>Register an account</NavLink>{" "}
        </div>
      </form>
      {/* <div className="horizontal">
        <div className="horizontalText">or</div>
        <div className="horizontalLine"></div>
      </div>
      <div className="google-btn cursor-pointer" onClick={handleGoogleSignIn}>
        <div className="flex items-center justify-center">
          <div className="max-w-[48px] mobile:max-w-[44px] border border-blue-500">
            <img src="/google-icon.png" alt="" />
          </div>
          <span className="bg-blue-500 py-[12px] px-[14px] text-white font-medium mobile:text-sm">
            Login with google
          </span>
        </div>
      </div> */}
    </AuthenticationPage>
  );
};

export default SignInPage;
