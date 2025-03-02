import React from 'react';
import axios from 'axios';

const Form = ({ formData, setFormData, fetchItems, editingItem, setEditingItem }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      axios.put(`http://localhost:5001/api/items/${editingItem._id}`, formData)
        .then(() => {
          fetchItems();
          setFormData({ name: '', description: '' });
          setEditingItem(null);
        });
    } else {
      axios.post('http://localhost:5001/api/items', formData)
        .then(() => {
          fetchItems();
          setFormData({ name: '', description: '' });
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-4">
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="p-2 border rounded w-1/3"
      />
      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="p-2 border rounded w-1/3"
      />
      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
        {editingItem ? 'Update' : 'Add'}
      </button>
    </form>
  );
};

export default Form;
