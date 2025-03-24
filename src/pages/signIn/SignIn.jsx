import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineMail,
  MdLock,
} from "../../utils/Icons.jsx";
import Input from "../../components/common/Input";
import { useLazyQuery } from "@apollo/client";
import Button from "../../components/common/Button.jsx";
import { LOGIN } from "../../graphql/query/UserQuery.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [login] = useLazyQuery(LOGIN, {
    fetchPolicy: "no-cache",
    onError: (error) => {
      if (error.message.includes("User Not Found")) {
        toast.error("User Not Found");
      } else if (error.message.includes("Invalid Password")) {
        toast.error("Invalid password");
      }
    },
  });

  // console.log(error?.message.includes);

  const submit = async (formData) => {
    try {
      const response = await login({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });

      if (response.data?.login) {
        toast.success("User Login Successfully");
        navigate("/home");
      }
    } catch (err) {
      console.error("Error during sign-in:", err);
    }
  };

  return (
    <div className="signup-form-con">
      <h1 className="auth-title">Sign In</h1>
      <form className="signup-form" onSubmit={handleSubmit(submit)}>
        <div className="form-body">
          <Input
            label="Email"
            type="email"
            placeholder="Email"
            register={register}
            name="email"
            error={errors.email}
          />
          <AiOutlineMail />
        </div>

        <div className="form-body password-input">
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            name="password"
            error={errors.password}
          />
          <MdLock />
        </div>
        <Button message="Sign In" type="submit" />
        <p className="have-account">
          Don't have an Account ?<span onClick={() => {}}>Sign Up</span>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
