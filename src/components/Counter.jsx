import { useItemsContext } from "../hooks";

export default function Counter() {
    const { stats } = useItemsContext();
    return (
        <p><b>{stats.packed}</b> / {stats.total}</p>
    );
}