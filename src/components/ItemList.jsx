import Select from "react-select";
import EmptyView from "./EmptyView";
import { useMemo, useState } from "react";
import { useItemsStore } from "../stores/itemsStore";


const sortingOptions = [
    { label: 'Sort by default', value: 'default' },
    { label: 'Sort by packed', value: 'packed' },
    { label: 'Sort by unpacked', value: 'unpacked' },
];

export default function ItemList() {

    const [sortBy, setSortBy] = useState('default');
    const items = useItemsStore(state => state.items);
    const deleteItem = useItemsStore(state => state.deleteItem);
    const toggleItem = useItemsStore(state => state.toggleItem);

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
                sortedItems.map(item => <Item key={item?.id} onDelete={deleteItem} onToggle={toggleItem} item={item} />)
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

