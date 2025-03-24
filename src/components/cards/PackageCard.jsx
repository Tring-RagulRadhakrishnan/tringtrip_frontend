import React from 'react'
import Button from '../common/Button'


const PackageCard = ({pack}) => {
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
                  <Button message={`₹${pkg.price}`} type="button" />
                </div>
              </div>
            </div>
          ))}
        </div>
  )
}

export default PackageCard