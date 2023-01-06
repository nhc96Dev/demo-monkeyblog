import { Button } from "components/button";
import { Field } from "components/field";
import { Input, InputPasswordToggle } from "components/input";
import { Label } from "components/label";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useFirebaseImage from "hooks/useFirebaseImage";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { userRole, userStatus } from "utils/constants";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Textarea } from "components/textarea";
import { ImageUpload } from "components/image";

const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  username: yup.string().required("Please enter your username"),
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
  status: yup.number(),
  role: yup.number(),
});

const UserProfile = () => {
  const { userInfo } = useAuth();
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const imageUrl = getValues("avatar");
  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues);

  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  useEffect(() => {
    async function fetchData() {
      if (!userInfo.uid) return;
      const colRef = doc(db, "users", userInfo.uid);
      const docData = await getDoc(colRef);
      reset(docData && docData.data());
    }
    fetchData();
  }, [reset, userInfo?.uid]);

  const handleUpdateProfile = async (values) => {
    if (!isValid || !userInfo.uid) return;
    try {
      const colRef = doc(db, "users", userInfo.uid);
      await updateDoc(colRef, {
        ...values,
        avatar: image,
        birthday: values.birthday,
        phone: values.phone,
      });
      toast.success("Update user information successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Update user failed!");
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

  const renderRoleLabel = (role) => {
    switch (role) {
      case userRole.ADMIN:
        return "Admin";
      case userRole.MOD:
        return "Moderator";
      case userRole.USER:
        return "User";

      default:
        break;
    }
  };
  const renderLabelStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <span className="text-green-500">Active</span>;
      case userStatus.PENDING:
        return <span className="text-orange-500">Pending</span>;
      case userStatus.BAN:
        return <span className="text-red-500">Rejected</span>;

      default:
        break;
    }
  };
  return (
    <div>
      <DashboardHeading
        title="Account information"
        desc="Update your account information"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="text-center mb-10">
          <ImageUpload
            className="!w-[200px] h-[200px] !rounded-full min-h-0 mx-auto"
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
            progress={progress}
            image={image}
          ></ImageUpload>
        </div>

        <div className="form-layout">
          <Field>
            <div className="flex items-center gap-x-10">
              <Label className="!cursor-default">
                Role:{" "}
                <span className="text-green-500">
                  {renderRoleLabel(userInfo?.role)}
                </span>
              </Label>
              <Label className="!cursor-default">
                Status: {renderLabelStatus(userInfo?.status)}
              </Label>
            </div>
          </Field>
        </div>

        <div className="form-layout">
          <Field>
            <Label htmlFor="fullname">Fullname</Label>
            <Input
              control={control}
              name="fullname"
              placeholder="Enter your fullname"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="username">Username</Label>
            <Input
              control={control}
              name="username"
              placeholder="Enter your username"
            ></Input>
          </Field>
        </div>

        <div className="form-layout">
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              control={control}
              name="email"
              type="email"
              placeholder="Enter your email address"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <InputPasswordToggle
              control={control}
              name="password"
              type="password"
              placeholder="Enter your password"
            ></InputPasswordToggle>
          </Field>
        </div>

        <div className="form-layout">
          <Field>
            <Label htmlFor="birthday">Date of Birth</Label>
            <Input
              type="date"
              control={control}
              name="birthday"
              placeholder="dd/mm/yyyy"
              min="1985-01-01"
              max="2023-01-01"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              type="tel"
              control={control}
              name="phone"
              placeholder="Enter your phone number"
            ></Input>
          </Field>
        </div>

        <div className="form-layout">
          <Field>
            <Label htmlFor="description">Description</Label>
            <Textarea name="description" control={control}></Textarea>
          </Field>
        </div>

        <Button
          type="submit"
          kind="primary"
          className="mx-auto w-[200px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;
