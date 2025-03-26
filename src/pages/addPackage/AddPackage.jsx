import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UploadButton } from "@bytescale/upload-widget-react";
import { CREATE_PACKAGE } from "../../graphql/mutation/PackageMutation";
import { useForm } from "react-hook-form";
import Input from "../../components/common/Input";
import "./AddPackage.css";
import Button from "../../components/common/Button";
import PrevImg from "../../assets/prev_img.avif";

const AddPackage = () => {
  const [imagePreview, setImagePreview] = useState(PrevImg);
  const [Myimage, setImage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const options = {
    apiKey: "public_W23MT5kAXXZaaviCEt1KvmNyKfpG", 
    maxFileCount: 1,
  };

  const [createPackage] = useMutation(CREATE_PACKAGE, {
    fetchPolicy: "no-cache",
  });



  const onSubmit = async (data) => {
    let price = parseInt(data?.price);

    try {
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

      console.log(">>>>>>>>>>>>pack");

      console.log(
        "Image URL on Submit:",
        data.package_img,
        data.title,
        data.days,
        data.visitPlace,
        data.price,
        data.location,
        Myimage
      );
    } catch (err) {
      console.log("log from create package", err);
    }
  };

  return (
    <div className="addpackage-container">
      <h2 className="addpackage-heading">Add New Package</h2>
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
            onComplete={(files) =>
            {
              setImage(files[0].fileUrl)
              setImagePreview(files[0].fileUrl)

            }

            }
          >
            {({ onClick }) => (
              <button onClick={onClick}>Upload a Image</button>
            )}
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
              <option value="" disabled hidden>
                Select Location
              </option>
              <option value="Thailand">Thailand</option>
              <option value="Dubai">Dubai</option>
              <option value="Vietnam">Vietnam</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Maldives">Maldives</option>
              <option value="Singapore">Singapore</option>
              <option value="Bali">Bali</option>
              <option value="Andaman">Andaman</option>
              <option value="Goa">Goa</option>
              <option value="Kerala">Kerala</option>
              <option value="Himachal">Himachal</option>
              <option value="Kashmir">Kashmir</option>
              <option value="South India">South India</option>
              <option value="North East">North East</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Bhutan">Bhutan</option>
              <option value="Europe">Europe</option>
              <option value="Almaty">Almaty</option>
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
