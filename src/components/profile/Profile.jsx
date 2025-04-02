import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

import { userContext } from "../../App";

import { UPDATE_USER } from "../../graphql/mutation/userMutation";

import Input from "../common/Input";
import Button from "../common/Button";

import ProfileImg from "../../assets/profile_img.jpg";

import "./Profile.css";


const Profile = () => {
  const { userData, setUserData } = useContext(userContext);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  console.log(userData);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
    },
  });

  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name,
        email: userData.email,
        phone_number: userData.phone_number,
      });
    }
  }, [userData]);
  

  const [updateUser,{data}] = useMutation(UPDATE_USER, { fetchPolicy: "network-only" });

  const onSubmit = async (data) => {
    try {
      const response = await updateUser({
        variables: {
          name: data.name,
          phone_number: data.phone_number,
          user_id: userData?.user_id,
        },
      });
  
      if (response?.data?.updateUser) {
       
        setUserData((prevUserData) => ({
          ...prevUserData,
          name: response.data.updateUser.name,
          phone_number: response.data.updateUser.phone_number,
        }));
        
        toast.success("Profile updated successfully!");
        setEditMode(false);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile.");
    }
  };
  

  const handleCancel = () => {
    reset({
      name: userData.name,
      email: userData.email,
      phone_number: userData.phone_number,
    });
    setEditMode(false);
  };

  useEffect(()=>{
    if(data?.updateUser)
    setUserData({
      ...userData,
      name: data?.updateUser.name,
      phone_number: data?.updateUser.phone_number,
    }); 
  },[data?.updateUser])

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Profile Page</h1>
      </div>
      <div className="profile-page-container">
        <div className="profile-container">
          <div className="profile-card">
            <h2>Personal Information</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="profile-form-container"
            >
              <Input
                className="profile-input"
                label="Name"
                type="text"
                placeholder="Enter your name"
                name="name"
                register={register}
                error={errors.name}
                disabled={!editMode}
              />
              <Input
                className="profile-input"
                label="Email"
                type="text"
                placeholder="Enter your email"
                name="email"
                register={register}
                error={null}
                disabled
              />
              <Input
                className="profile-input"
                label="Phone Number"
                type="text"
                placeholder="Enter your phone number"
                name="phone_number"
                register={register}
                error={errors.phone_number}
                disabled={!editMode}
              />
              <div className="profile-actions">
                {editMode ? (
                  <div className="profile-button-container">
                    <button type="submit" className="save-btn">
                      Save
                    </button>
                    <button
                      type="sumbit"
                      onClick={handleCancel}
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"   
                    onClick={(e) => {
                      e.preventDefault();
                      setEditMode(!editMode);
                    }}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="profile-page-booking-container">
          <h2>Click to visit bookings</h2>
          <img src={ProfileImg} alt="" className="profile-mybooking-image" />
          <Button
            type="button"
            message="Go to My Bookings"
            onClick={() => navigate("/mybookings")}
            className="mybookings-btn"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
