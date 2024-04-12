import { create } from "zustand";
import { initialItems } from "../lib/constants";
import { persist } from "zustand/middleware";

export const useItemsStore = create(
    persist(set => ({
        items: initialItems,
        addItem: name => {
            set(state => {
                const newItems = [...state.items, { id: crypto.randomUUID(), name, packed: false }];
                return { items: newItems };
            });
        },
        deleteItem: id => set(state => ({ items: state.items.filter(item => item.id !== id) })),
        markAllAsComplete: () => set(state => ({ items: state.items.map(item => ({ ...item, packed: true })) })),
        markAllAsIncomplete: () => set(state => ({ items: state.items.map(item => ({ ...item, packed: false })) })),
        removeAllItems: () => set(() => ({ items: [] })),
        resetToInitial: () => set(() => ({ items: initialItems })),
        toggleItem: id => set(state => ({ items: state.items.map(item => item.id === id ? ({ ...item, packed: !item.packed }) : item) }))
    }), {
        name: "items"
    })
);