import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import ItemCard from './components/ItemCard';
import Form from './components/Form';

const App = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios.get('http://localhost:5001/api/items')
      .then((response) => setItems(response.data))
      .catch((error) => console.error('Error fetching items:', error));
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({ name: item.name, description: item.description });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5001/api/items/${id}`)
      .then(() => fetchItems());
  };

  const handleExport = () => {
    const exportData = items.map((item, index) => ({
      No: index + 1,
      Name: item.name,
      Description: item.description
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Items');
    XLSX.writeFile(workbook, 'items.xlsx');
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Item List</h1>

      <Form
        formData={formData}
        setFormData={setFormData}
        fetchItems={fetchItems}
        editingItem={editingItem}
        setEditingItem={setEditingItem}
      />

      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-6 p-2 border rounded w-full"
      />

      <button onClick={handleExport} className="mb-6 px-4 py-2 bg-yellow-500 text-white rounded-md">
        Export to Excel
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <ItemCard key={item._id} item={item} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default App;