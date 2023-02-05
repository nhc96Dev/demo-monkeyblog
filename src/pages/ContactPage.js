import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Field } from "components/field";
import { Label } from "components/label";
import { Input } from "components/input";
import { Button } from "components/button";
import { Textarea } from "components/textarea";
import { toast } from "react-toastify";

import emailjs from "@emailjs/browser";
import Header from "components/layout/Header";

const schema = yup.object({
  fullname: yup.string().required("Please enter your name"),
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  message: yup.string().required("Please enter your message"),
});
const ContactPage = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      message: "",
    },
    resolver: yupResolver(schema),
  });

  const form = useRef();
  const sendEmail = (e) => {
    if (!isValid) return;
    emailjs
      .sendForm(
        "demo-monkeybog",
        "email_monkeyblog",
        form.current,
        "DTWa9895rfRpZANcM"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    toast.success("Your message has been sent successfully!", {
      pauseOnHover: false,
      delay: 0,
    });
    reset({
      fullname: "",
      email: "",
      message: "",
    });
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
    document.title = "Contact Page";
  }, []);
  return (
    <div className="">
      <Header></Header>
      <div className="h-screen pt-[150px] md:pt-0 mobile:pt-0">
        <div className="max-w-[800px] w-full mx-auto bg-white rounded-2xl relative">
          <div className="p-5 bg-primary text-white lg:p-[30px] lg:absolute lg:top-10 lg:-left-20 lg:bottom-10 lg:w-[380px] md:px-10 md:py-10 md:text-center mobile:px-10 mobile:py-8 mobile:text-center">
            <div>
              <h3 className="text-[28px] mobile:text-[22px] font-semibold mb-10 mobile:mb-5 text-center">
                Contact Us
              </h3>
              <p className="mb-10 md:mb-7 mobile:mb-5 mobile:text-sm">
                Do you have any questions, suggestions or feedbacks? I'd love to
                hear from you!
              </p>
              <div className="">
                <div className="flex items-center mb-8 gap-x-3 md:mb-7 mobile:mb-5">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 border border-white rounded-full mobile:h-8 mobile:w-8 mobile:text-sm">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <span className="font-medium mobile:text-sm">
                    +84 123456789
                  </span>
                </div>
                <div className="flex items-center mb-8 gap-x-3 md:mb-7 mobile:mb-5">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 border border-white rounded-full mobile:h-8 mobile:w-8 mobile:text-sm">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <span className="font-medium mobile:text-sm">
                    nhc96.dev@gmail.com
                  </span>
                </div>
                <div className="flex items-center mb-8 gap-x-3 md:mb-7 mobile:mb-5">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 border border-white rounded-full mobile:h-8 mobile:w-8 mobile:text-sm">
                    <i className="fa-solid fa-earth-asia"></i>
                  </div>
                  <span className="font-medium mobile:text-sm">
                    demo-monkeyblog-nhc.vercel.app
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-x-8 opacity-70">
                <a
                  href="https://www.facebook.com/"
                  target={"_blank"}
                  rel="noreferrer"
                  className="social text-[24px] mobile:text-[20px]"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a
                  href="https://www.instagram.com/"
                  target={"_blank"}
                  rel="noreferrer"
                  className="social text-[24px] mobile:text-[20px]"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a
                  href="https://www.youtube.com/"
                  target={"_blank"}
                  rel="noreferrer"
                  className="social text-[24px] mobile:text-[20px]"
                >
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="py-[70px] pr-12 pl-[350px] shadow-[0_35px_50px_15px_rgba(0,0,0,0.3)] mobile:px-5 mobile:py-8 mobile:shadow-xl mobile:mt-0 mobile:mb-0 md:px-10 md:py-10 md:shadow-xl md:mt-5 md:mb-5">
            <h3 className="text-[28px] mobile:text-[22px]  font-semibold mb-10 mobile:mb-5 text-center">
              Leave A Message
            </h3>
            <form
              className="form"
              // autoComplete="off"
              onSubmit={handleSubmit(sendEmail)}
              // onSubmit={sendEmail}
              ref={form}
            >
              <Field>
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  name="fullname"
                  control={control}
                  placeholder="Enter your full name"
                ></Input>
              </Field>
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
                <Label htmlFor="message">Message</Label>
                <Textarea
                  name="message"
                  control={control}
                  placeholder="Enter your message"
                ></Textarea>
              </Field>
              <Button
                type="submit"
                className="w-full max-w-[200px] mx-auto"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                Send
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
