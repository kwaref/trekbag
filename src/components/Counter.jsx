export default function Counter({stats}) {
    return (
        <p><b>{stats.packed}</b> / {stats.total}</p>
    );
}
