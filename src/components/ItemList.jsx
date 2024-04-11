import Select from "react-select";
import EmptyView from "./EmptyView";
import { useMemo, useState } from "react";

const sortingOptions = [
    { label: 'Sort by default', value: 'default' },
    { label: 'Sort by packed', value: 'packed' },
    { label: 'Sort by unpacked', value: 'unpacked' },
];

export default function ItemList({ items, handleDeleteItem, handleToggleItem }) {

    const [sortBy, setSortBy] = useState('default');

    const sortedItems = useMemo(() => [...items].sort((a, b) => {
        if (sortBy === 'packed') {
            return b.packed - a.packed;
        }
        if (sortBy === 'unpacked') {
            return a.packed - b.packed;
        }
        return;
    }), [items, sortBy]);


    return (
        <ul className="item-list">
            {
                !items.length && <EmptyView />
            }
            {
                !!items.length && <section className="sorting">
                    <Select onChange={option => setSortBy(option.value)} defaultValue={sortingOptions[0]} options={sortingOptions} />
                </section>
            }
            {
                sortedItems.map(item => <Item key={item?.id} onDelete={handleDeleteItem} onToggle={handleToggleItem} item={item} />)
            }
        </ul>
    );
}

function Item({ item, onDelete, onToggle }) {
    const handleClick = () => onDelete(item.id);
    return (
        <li className="item">
            <label><input type="checkbox" checked={item?.packed} onChange={() => onToggle(item.id)} />{item?.name}</label>
            <button onClick={handleClick}>❌</button>
        </li>
    );
}

