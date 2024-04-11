import { useState } from "react";
import { Button } from "./Button";
import { useRef } from "react";

export default function AddItemForm({ onAddItem }) {
    const [itemText, setItemText] = useState('');
    const inputRef = useRef(null)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (itemText === '') {
            inputRef.current.focus();
            return;
        }
        onAddItem(itemText);
        setItemText('');
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>Add an item</h2>
            <input
                ref={inputRef}
                type="text"
                value={itemText}
                onChange={(e) => setItemText(e.target.value)}
                autoFocus
            />
            <Button>Add to list</Button>
        </form>
    );
}
