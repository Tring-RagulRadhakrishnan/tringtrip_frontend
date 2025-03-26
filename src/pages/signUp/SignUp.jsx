import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineMail,
  FaUser,
  MdLock,
  IoIosPhonePortrait,
} from '../../utils/Icons.jsx';
import "./SignUp.css";
import { validation } from "../../utils/validations.js";
import Input from "../../components/common/Input";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../graphql/mutation/userMutation.jsx";
import Button from "../../components/common/Button.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";

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
    const hashedPassword = await bcrypt.hash(formData.password, 5);
    console.log("Hashed Password:", hashedPassword);
  
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
            register={(name) => register(name, validation.name)}
            name="name"
            error={errors.name}
          />
          <FaUser />
        </div>
        <div className="form-body">
          <Input
            label="Email"
            type="email"
            placeholder="Email"
            register={(email) => register(email, validation.email)}
            name="email"
            error={errors.email}
          />
          <AiOutlineMail />
        </div>
        <div className="form-body">
          <Input
            label="Phone Number"
            type="tel"
            placeholder="Phone Number"
            register={(phone_number) =>
              register(phone_number, validation.phone_number)
            }
            name="phone_number"
            error={errors.phone_number}
          />
          <IoIosPhonePortrait />
        </div>
        <div className="form-body password-input">
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            register={(password) => register(password, validation.password)}
            name="password"
            error={errors.password}
          />
          <MdLock />
        </div>
        <Button message="Sign Up" type="submit" className="auth-button"/>
        <p className="have-account">
          Already have an Account ?<span onClick={() => {}}>Sign In</span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
