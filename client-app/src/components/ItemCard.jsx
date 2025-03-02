import React from 'react';

const ItemCard = ({ item, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
      <p className="text-gray-600">{item.description}</p>
      <div className="flex gap-2 mt-4">
        <button onClick={() => onEdit(item)} className="px-4 py-2 bg-blue-500 text-white rounded-md">Edit</button>
        <button onClick={() => onDelete(item._id)} className="px-4 py-2 bg-red-500 text-white rounded-md">Delete</button>
      </div>
    </div>
  );
};

export default ItemCard;
