import React from 'react'

const CardContainer = ({locationCard,category}) => {
    console.log(">>>>>>>>>>>>>>. card container",locationCard);

  return (
    <div className="home-package-outer-container">
         <h1>{category}</h1>
         <div className="home-package-container">
          {locationCard?.map((card) => (
            <div
              key={card.tp_id}
              className="home-package-card"
            //   onClick={() => handleCard(card)}
            >
              <img src={card.image} alt={card.location} />
              <p>{card.location}</p>
            </div>
          ))}
        </div>
      </div>
  )
}

export default CardContainer