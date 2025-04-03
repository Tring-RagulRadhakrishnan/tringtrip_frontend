import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLazyQuery } from "@apollo/client";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";

import { LOGIN } from "../../graphql/query/UserQuery.jsx";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button.jsx";



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


  const submit = async (formData) => {
    try {
      const hashedPassword = await bcrypt.hash(formData.password, 5);
      console.log("Hashed Password:", hashedPassword);
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
        </div>
        <Button message="Sign In" type="submit" />
        <p className="have-account">
          Don't have an Account ?<span onClick={() => {navigate('/signup')}}>Sign Up</span>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
