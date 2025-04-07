import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

import { userContext } from "../../App";
import { validation } from "../../utils/validations";
import { UPDATE_USER } from "../../graphql/mutation/userMutation";

import Input from "../common/Input";
import Button from "../common/Button";

import ProfileImg from "../../assets/profile_img.jpg";

import "./Profile.css";

const Profile = () => {
  const { userData, setUserData } = useContext(userContext);
  const [userDetail, setUserDetail] = useState();
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

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
      setUserDetail(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (userDetail) {
      reset({
        name: userDetail.name,
        email: userDetail.email,
        phone_number: userDetail.phone_number,
      });
    }
  }, [userDetail]);

  const [updateUser, { data }] = useMutation(UPDATE_USER, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.updateUser) {
      const updatedUser = {
        ...userData,
        name: data.updateUser.name,
        phone_number: data.updateUser.phone_number,
      };
      setUserData(updatedUser);
      setUserDetail(updatedUser);
    }
  }, [data?.updateUser]);

  const onSubmit = async (formData) => {
    try {
      const response = await updateUser({
        variables: {
          name: formData.name,
          phone_number: formData.phone_number,
          user_id: userData?.user_id,
        },
      });

      if (response?.data?.updateUser) {
        toast.success("Profile updated successfully!");
        setEditMode(false);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile.");
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    reset({
      name: userData.name,
      email: userData.email,
      phone_number: userData.phone_number,
    });
    setEditMode(false);
  };

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
                register={(name) => register(name, validation.name)}
                error={errors.name}
                disabled={!editMode}
              />
              <Input
                className="profile-input"
                label="Email"
                type="text"
                placeholder="Enter your email"
                name="email"
                register={(email) => register(email, validation.email)}
                error={null}
                disabled
              />
              <Input
                className="profile-input"
                label="Phone Number"
                type="text"
                placeholder="Enter your phone number"
                name="phone_number"
                register={(phone) =>
                  register(phone, validation.phone_number)
                }
                error={errors.phone_number}
                disabled={!editMode}
              />
              <div className="profile-actions">
                {editMode ? (
                  <div className="profile-button-container">
                    <button type="submit" className="save-btn">
                      Save
                    </button>
                    <button onClick={handleCancel} className="cancel-btn">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setEditMode(true)}
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
