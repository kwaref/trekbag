import { createContext, useEffect, useState } from "react";
import { initialItems } from "../lib/constants";

export const ItemsContext = createContext();

export default function ItemsContextProvider({ children }) {
    const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('items')) || initialItems);

    const stats = { total: items.length, packed: items.filter(({ packed }) => packed).length };

    const handleAddItem = (name) => {
        const newItems = [...items, { id: crypto.randomUUID(), name, packed: false }];
        setItems(newItems);
    };

    const handleRemoveAllItems = () => setItems([]);

    const handleResetToInitial = () => setItems(initialItems);

    const handleMarkAllAsComplete = () => setItems(items.map(item => ({ ...item, packed: true })));

    const handleMarkAllAsIncomplete = () => setItems(items.map(item => ({ ...item, packed: false })));

    const handleDeleteItem = id => setItems(items.filter(item => item.id !== id));

    const handleToggleItem = id => setItems(items.map(item => item.id === id ? ({ ...item, packed: !item.packed }) : item));

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
    }, [items]);

    return (
        <ItemsContext.Provider
            value={{
                items,
                stats,
                handleAddItem,
                handleDeleteItem,
                handleMarkAllAsComplete,
                handleMarkAllAsIncomplete,
                handleRemoveAllItems,
                handleResetToInitial,
                handleToggleItem
            }}
        >
            {children}
        </ItemsContext.Provider>
    );
}
