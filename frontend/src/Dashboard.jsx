import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://lost-found-system-medj.onrender.com";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");

  const fetchItems = async () => {
    const res = await axios.get(`${BASE_URL}/api/items`);
    setItems(res.data);
  };

  const addItem = async () => {
    await axios.post(`${BASE_URL}/api/items`, {
      itemName,
      type: "Lost"
    });
    fetchItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`${BASE_URL}/api/items/${id}`);
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <input placeholder="Item Name" onChange={(e) => setItemName(e.target.value)} />
      <button onClick={addItem}>Add Item</button>

      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.itemName}
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <button onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      }}>Logout</button>
    </div>
  );
}

export default Dashboard;