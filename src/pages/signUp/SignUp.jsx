import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

import { CREATE_USER } from "../../graphql/mutation/userMutation.jsx";

import { validation } from "../../utils/validations.js";
import { EncryptPassword } from "../../utils/EncryptPassword.jsx";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button.jsx";

import "./SignUp.css";


const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [createUser] = useMutation(CREATE_USER, {
    fetchPolicy: "no-cache",onError:(error)=>{
      if(error.message.includes("user is already found")){
        toast.error("user is already found")
      }
    }
  });
  const submit = async (formData) => {
    const hashedPassword = EncryptPassword(formData?.password);
    console.log(hashedPassword,"encoded");
  
    try {
      const response = await createUser({
        variables: {
          name: formData.name,
          email: formData.email,
          phone_number: formData.phone_number,
          password: hashedPassword,
        },
      });

      console.log(response.data.createUser);
      if (response.data.createUser) {
        toast.success("User Register Successfully");
        navigate("/signin");
      }
    } catch (err) {
      console.log("Error from handle registration", err);
    }
  };

  return (
    <div className="signup-form-con">
      <h1 className="auth-title">Create Account</h1>
      <form className="signup-form" onSubmit={handleSubmit(submit)}>
        <div className="form-body">
          <Input 
            label="Name"
            type="text"
            placeholder="Name"
            register={register}
            validation={validation.name}
            name="name"
            error={errors.name}
          />
        </div>
        <div className="form-body">
          <Input
            label="Email"
            type="email"
            placeholder="Email"
            register={register}
            validation={validation.email}
            name="email"
            error={errors.email}
          />
        </div>
        <div className="form-body">
          <Input
            label="Phone Number"
            type="tel"
            placeholder="Phone Number"
            register={register}
            validation={validation.phone_number}
            name="phone_number"
            error={errors.phone_number}
          />
        </div>
        <div className="form-body password-input">
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            validation={validation.password}
            name="password"
            error={errors.password}
          />
        </div>
        <Button message="Sign Up" type="submit" className="auth-button"/>
        <p className="have-account">
          Already have an Account ?<span onClick={() => {navigate('/signin')}}>Sign In</span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
