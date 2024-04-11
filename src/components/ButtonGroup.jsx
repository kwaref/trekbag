import { Button } from "./Button";
import { useItemsContext } from "../hooks";

export default function ButtonGroup() {
    const { handleMarkAllAsComplete, handleMarkAllAsIncomplete, handleRemoveAllItems, handleResetToInitial } = useItemsContext();
    const secondaryButtons = [
        { id: crypto.randomUUID(), text: 'Mark all as complete', onClick: handleMarkAllAsComplete },
        { id: crypto.randomUUID(), text: 'Mark all as incomplete', onClick: handleMarkAllAsIncomplete },
        { id: crypto.randomUUID(), text: 'Reset to initial', onClick: handleResetToInitial },
        { id: crypto.randomUUID(), text: 'Remove all items', onClick: handleRemoveAllItems },
    ];
    return (
        <section className="button-group">
            {
                secondaryButtons.map(({ id, text, onClick }) => <Button key={id} onClick={onClick} variant='secondary'>{text}</Button>)
            }
        </section>
    );
}
