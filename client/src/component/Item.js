import React from 'react'


const Item = ({ name, description, image }) => {
    return (
      <div className="w-56 p-2 m-2 shadow-lg bg-pink-50">
        <img src={image} />
        <h2 className="font-bold text-xl">{name}</h2>
        <h3>{description}</h3>
      </div>
    );
  };
  
  export default Item;