"use client";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { scale: 0 },
  show: { scale: 1 },
};

export default function Form() {
  interface FormData {
    name: string;
    email: string;
    message: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const sendEmail = (params: {
    to_name: string;
    from_name: string;
    reply_to: string;
    message: string;
  }) => {
    const toastId = toast.loading("Sending your message, please wait...");

    emailjs
      .send(
        process.env.NEXT_PUBLIC_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_TEMPLATE_ID as string,
        params,
        {
          publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
          limitRate: {
            throttle: 5000,
          },
        }
      )
      .then(
        () => {
          toast.success(
            "I have received your message, I will get back to you soon!",
            {
              id: toastId,
            }
          );
          console.log("email is send");
        },
        (error) => {
          toast.error(
            "There is an error sending your message, please try again later!",
            {
              id: toastId,
            }
          );
          console.log("email not send", error);
        }
      );
  };

  const onSubmit = (data: { name: string; email: string; message: string }) => {
    const templateParams = {
      to_name: "Suraj",
      from_name: data.name,
      reply_to: data.email,
      message: data.message,
    };
    sendEmail(templateParams);
  };

  return (
    <>
      <Toaster richColors={true} />
      <motion.form
        variants={container}
        initial="hidden"
        animate="show"
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full flex flex-col items-center justify-center space-y-4"
      >
        <motion.input
          variants={item}
          type="text"
          placeholder="name"
          {...register("name", {
            required: "This field is required!",
            minLength: {
              value: 3,
              message: "Name should be atleast 3 characters long.",
            },
          })}
          className="w-full bg-[#cf005d]/20 text-white p-2 rounded-md shadow-lg focus:ring-2 focus:ring-accent/50 "
        />
        {errors.name && (
          <span className="inline-block self-start text-accent">
            {errors.name.message}
          </span>
        )}
        <motion.input
          variants={item}
          type="email"
          placeholder="email"
          {...register("email", {
            required: "This field is required!",
            pattern: /^\S+@\S+$/i,
          })}
          className="w-full bg-[#cf005d]/20 text-white p-2 rounded-md shadow-lg text-foreground focus:ring-2 focus:ring-accent/50 custom-bg"
        />
        {errors.email && (
          <span className="inline-block self-start text-accent">
            {errors.email.message}
          </span>
        )}
        <motion.textarea
          variants={item}
          placeholder="message"
          {...register("message", {
            required: "This field is required!",
            maxLength: {
              value: 500,
              message: "Message should be less than 500 characters!",
            },
            minLength: {
              value: 50,
              message: "Message should be more than 50 characters!",
            },
          })}
          className="w-full bg-[#cf005d]/20 text-white p-2 rounded-md shadow-lg text-foreground focus:ring-2 focus:ring-accent/50 custom-bg"
        />
        {errors.message && (
          <span className="inline-block self-start text-accent">
            {errors.message.message}
          </span>
        )}

        <motion.input
          variants={item}
          value="Send"
          className="px-10 bg-black py-4 rounded-md shadow-lg bg-background border border-accent/30 border-solid hover:shadow-glass-sm backdrop-blur-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer capitalize"
          type="submit"
        />
      </motion.form>
    </>
  );
}
