import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { UploadButton } from "@bytescale/upload-widget-react";

import {
  CREATE_PACKAGE,
  UPDATE_PACKAGE,
} from "../../graphql/mutation/PackageMutation";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import PrevImg from "../../assets/prev_img.avif";

import "./AddPackage.css";

const AddPackage = () => {
  const location = useLocation();
  const existingPackage = location?.state;
  const editMode = !!existingPackage;
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(
    existingPackage?.package_img || PrevImg
  );
  const [Myimage, setImage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const options = {
    apiKey: "public_W23MT5kAXXZaaviCEt1KvmNyKfpG",
    maxFileCount: 1,
  };

  const [createPackage] = useMutation(CREATE_PACKAGE, {
    fetchPolicy: "no-cache",
  });
  const [updatePackage] = useMutation(UPDATE_PACKAGE, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (existingPackage) {
      reset({
        title: existingPackage.title,
        days: existingPackage.days,
        visitPlace: existingPackage.visit_place,
        price: existingPackage.price,
        location: existingPackage.location,
      });
    }
  }, [existingPackage]);

  const onSubmit = async (data) => {
    let price = parseInt(data?.price);

    try {
      if (editMode) {
        const response = await updatePackage({
          variables: {
            package_img: Myimage,
            title: data.title,
            days: data.days,
            visit_place: data.visitPlace,
            price: price,
            location: data.location,
            package_id: existingPackage.package_id,
          },
        });
        if (response?.data?.updatePackage) {
          toast.success("package updated");
          navigate("/home");
        }
      } else {
        const response = await createPackage({
          variables: {
            package_img: Myimage,
            title: data.title,
            days: data.days,
            visit_place: data.visitPlace,
            price: price,
            location: data.location,
          },
        });
        if (response?.data?.createPackage) {
          toast.success("package created");
          navigate("/home");
        }
      }
    } catch (err) {
      console.log("log from create package", err);
    }
  };
  const locations = [
    "Thailand",
    "Dubai",
    "Vietnam",
    "Malaysia",
    "Maldives",
    "Singapore",
    "Bali",
    "Andaman",
    "Goa",
    "Kerala",
    "Himachal",
    "Kashmir",
    "South India",
    "North East",
    "Uttarakhand",
    "Ladakh",
    "Bhutan",
    "Europe",
    "Almaty",
  ];
  return (
    <div className="addpackage-container">
      <h1 className="addpackage-heading">
        {editMode ? "Update Package" : "Add New Package"}
      </h1>
      <div className="addpackage-image-preview-container">
        <img
          src={imagePreview}
          alt="Image Preview"
          className="addpackage-image-preview"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-field add-package-image">
          <UploadButton
            options={options}
            onComplete={(files) => {
              setImage(files[0].fileUrl);
              setImagePreview(files[0].fileUrl);
            }}
          >
            {({ onClick }) => <button onClick={onClick}>Upload a Image</button>}
          </UploadButton>
          {errors.file && <p className="error">{errors.file.message}</p>}
        </div>
        <div className="add-package-input-container">
          <Input
            label="Title"
            type="text"
            placeholder="Title"
            register={register}
            name="title"
            error={errors.title}
            className="add-package-input"
          />
          <Input
            label="Days"
            type="text"
            placeholder="Days"
            register={register}
            name="days"
            error={errors.days}
          />
          <Input
            label="Visit Place"
            type="text"
            placeholder="Visit Place"
            register={register}
            name="visitPlace"
            error={errors.visitPlace}
          />
          <Input
            label="Price"
            type="number"
            placeholder="Price"
            register={register}
            name="price"
            error={errors.price}
          />

          <div className="add-package-input-field">
            <label>Location</label>
            <select
              {...register("location", { required: "Location is required" })}
              className="input"
            >
              <option hidden> Select Location </option>
              {locations.map((place) => (
                <option value={place}>{place}</option>
              ))}
            </select>
            {errors.location && (
              <p className="error">{errors.location.message}</p>
            )}
          </div>
          <div className="add-package-submit-button">
            <Button
              type="submit"
              message="Add Package"
              className="addpackage-submit-button"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPackage;
