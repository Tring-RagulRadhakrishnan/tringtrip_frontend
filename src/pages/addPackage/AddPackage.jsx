import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import axios from "axios";
import { CREATE_PACKAGE } from "../../graphql/mutation/PackageMutation";
import { useForm } from "react-hook-form";
import Input from "../../components/common/Input";
import "./AddPackage.css";
import Button from "../../components/common/Button";

const AddPackage = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [createPackage] = useMutation(CREATE_PACKAGE);

  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValue("file", file); 

    if (file && file.type.startsWith("image/")) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const onSubmit = async (data) => {
    try {
      const fileData = new FormData();
      fileData.append("file", data.file);

      const uploadResponse = await axios.post("http://localhost:8000/upload", fileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const packageImg = uploadResponse.data.filePath;

      await createPackage({
        variables: {
          packageImg,
          title: data.title,
          days: data.days,
          visitPlace: data.visitPlace,
          price: parseInt(data.price),
          location: data.location,
        },
      });

      alert("Package created successfully!");
    } catch (error) {
      console.error("Error creating package:", error);
      alert("Failed to create package");
    }
  };

  return (
    <div className="addpackage-container">
      <h2 className="addpackage-heading">Add New Package</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="add-package-form-container">
        <Input
          label="Title"
          type="text"
          placeholder="Title"
          register={register}
          name="title"
          error={errors.title}
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
        <Input
          label="Location"
          type="text"
          placeholder="Location"
          register={register}
          name="location"
          error={errors.location}
        />
        
        <div className="input-field">
          <label>Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            {...register("file", { required: "File is required" })}
            className="input"
          />
          {errors.file && <p className="error">{errors.file.message}</p>}
        </div>
        
        {imagePreview && (
          <div className="addpackage-image-preview-container">
            <img
              src={imagePreview}
              alt="Image Preview"
              className="addpackage-image-preview"
            />
          </div>
        )}
        <Button type="submit" message="Add Package" className="addpackage-submit-button"/>
      </form>
    </div>
  );
};

export default AddPackage;
