import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

import { userContext } from "../../App";

import Button from "../common/Button";
import ConfirmPopup from "../confirmPopup/ConfirmPopup";

import { DELETE_PACKAGE } from "../../graphql/mutation/PackageMutation";


const PackageCard = ({ pack }) => {
  const navigate = useNavigate();
  const {userData} = useContext(userContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState(null);

  const [deletePackage] = useMutation(DELETE_PACKAGE, {
    fetchPolicy: "no-cache",
  });

  const handlePack = (pkg) => {
    navigate("/bookpackage", { state: pkg });
  };

  const handleUpdate = (pkg) => {
    navigate("/addpackage", { state: pkg });
  };

  const confirmDelete = (pkg) => {
    setPackageToDelete(pkg.package_id);
    setIsPopupOpen(true);
  };

  const handleDelete = async () => {
    if (!packageToDelete) return;

    try {
      const response = await deletePackage({
        variables: {
          package_id: packageToDelete,
        },
      });

      if (response?.data?.deletePackage) {
        toast.error("Package Deleted");
        navigate("/home");
      }
    } catch (err) {
      console.error("Error deleting package:", err);
    }

    setIsPopupOpen(false);
    setPackageToDelete(null);
  };

  return (
    <div className="packages-container">
      {pack?.map((pkg) => (
        <div className="package-card" key={pkg.package_id}>
          <img
            src={pkg.package_img}
            alt={pkg.title}
            className="package-card-img"
          />
          <div className="package-card-content">
            <div className="package-card-title-container">
              <h3 className="package-card-title">{pkg.title}</h3>
              <p className="package-card-days">{pkg.days}</p>
            </div>

            <ul className="package-card-visit">
              <p>Visit Places</p>
              {pkg.visit_place.split(",")?.map((place, index) => (
                <li key={index}>{place.trim()}</li>
              ))}
            </ul>
              
            <div className="package-card-button-container">
              <Button
                message={`₹${pkg.price} / person`}
                type="button"
                onClick={() => handlePack(pkg)}
              />
            </div>
            {userData?.role=="admin"&&(
            <div className="edit-delete-button-container">
              <Button message="Update" type="button" onClick={() => handleUpdate(pkg)} />
              <Button
                message="Delete"
                type="button"
                onClick={() => confirmDelete(pkg)}
              />
            </div>
            )}
          </div>
        </div>
      ))}

      <ConfirmPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this package?"
      />
    </div>
  );
};

export default PackageCard;
