import React, { useState, useEffect } from "react";
import "./ShoppingList.css"; // Add styles for better UI




    

const ShoppingList = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: "", category: "", url: "" });
    const [isVisible, setIsVisible] = useState(false);
    const toggleShoppingList = () => {
        setIsVisible(!isVisible);
    };

    // Load shopping list from LocalStorage
    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem("shoppingList")) || [];
        setItems(storedItems);
    }, []);

    // Save shopping list to LocalStorage
    useEffect(() => {
        localStorage.setItem("shoppingList", JSON.stringify(items));
    }, [items]);

    // Add new item
    const addItem = () => {
        if (!newItem.name || !newItem.url) return;
        setItems([...items, { ...newItem, trackedPrice: null }]);
        setNewItem({ name: "", category: "", url: "" });
    };

    // Simulate Price Check
    const checkPrice = (index) => {
        const mockPrice = Math.floor(Math.random() * (2000 - 500) + 500); // Random price between ₹500-₹2000
        const updatedItems = [...items];
        updatedItems[index].trackedPrice = mockPrice;
        setItems(updatedItems);
    };
    const deleteItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
    };
    

    return (
        <div className="shopping-container"  style={{
            background: "rgba(255, 255, 255, 0.9)", // ✅ Semi-transparent white
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // ✅ Soft shadow
            textAlign: "center",
            width: "300px",
            margin: "20px auto",
            position: "relative",
            zIndex: 10, // ✅ Ensures it's above the particles
          }}>
            <button className="toggle-btn" onClick={toggleShoppingList}>
                {isVisible ? "Hide Shopping List" : "Show Shopping List"}
            </button>
            <h2>🛒 Smart Shopping List</h2>

            
            <div className="shopping-form">
                <input
                    type="text"
                    placeholder="Item Name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Product URL"
                    value={newItem.url}
                    onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                />
                <button onClick={addItem}>Add Item</button>
            </div>

            {isVisible && (
                <div className="shopping-container">
            <ul className="shopping-list">
    {items.map((item, index) => (
        <li key={index}>
            <div>
                <strong>{item.name}</strong> - {item.category}
                <br />
                <a href={item.url} target="_blank" rel="noopener noreferrer">🔗 View Product</a>
            </div>
            <div>
                {item.trackedPrice ? (
                    <span className="price-tag">₹{item.trackedPrice}</span>
                ) : (
                    <button onClick={() => checkPrice(index)}>Check Price</button>
                )}
                <button className="delete-btn" onClick={() => deleteItem(index)}>🗑️ Delete</button>
            </div>
        </li>
    ))}
</ul> </div>
            )}

        </div>
    );
};

export default ShoppingList;
