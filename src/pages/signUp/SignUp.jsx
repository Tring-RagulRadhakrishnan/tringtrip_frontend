import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineMail,
  FaUser,
  MdLock,
  IoIosPhonePortrait,
} from "../../utils/icons.jsx";
import "./SignUp.css";
import {useNavigate} from 'react-router-dom'
import travelImg from "../../assets/Auth_img.jpg";
import Input from "../../components/common/Input";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    console.log("hi");


  };
  return (
    <div className="signup-outer-con">
      <div className="signup-con1">
        <img src={travelImg} alt="" />
      </div>
      <div className="signup-con2">
        <div className="signup-form-con">
          <h1>Create Account</h1>
          <form className="signup-form" onSubmit={handleSubmit(submit)}>
            <div className="form-body">
              <Input
                label="Name"
                type="text"
                placeholder="Name"
                register={register}
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
                register={register}
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
                register={register}
                name="phone_number"
                error={errors.phone_number}
              />
              <IoIosPhonePortrait />
            </div>
            <div className="form-body">
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
            <p className="have-account">
              Already have an Account ?
              <span
                onClick={() => {
                  navigate("/signin");
                }}
              >
                Sign In
              </span>
            </p>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
