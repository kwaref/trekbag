import { useItemsStore } from "../stores/itemsStore";
import { Button } from "./Button";

export default function ButtonGroup() {

    const markAllAsComplete = useItemsStore(state => state.markAllAsComplete);
    const markAllAsIncomplete = useItemsStore(state => state.markAllAsIncomplete);
    const resetToInitial = useItemsStore(state => state.resetToInitial);
    const removeAllItems = useItemsStore(state => state.removeAllItems);

    const secondaryButtons = [
        { id: crypto.randomUUID(), text: 'Mark all as complete', onClick: markAllAsComplete },
        { id: crypto.randomUUID(), text: 'Mark all as incomplete', onClick: markAllAsIncomplete },
        { id: crypto.randomUUID(), text: 'Reset to initial', onClick: resetToInitial },
        { id: crypto.randomUUID(), text: 'Remove all items', onClick: removeAllItems },
    ];
    return (
        <section className="button-group">
            {
                secondaryButtons.map(({ id, text, onClick }) => <Button key={id} onClick={onClick} variant='secondary'>{text}</Button>)
            }
        </section>
    );
}
