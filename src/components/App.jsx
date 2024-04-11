import { useEffect, useState } from "react";
import { initialItems } from "../lib/constants";
import BackgroundHeading from "./BackgroundHeading";
import Footer from "./Footer";
import Header from "./Header";
import ItemList from "./ItemList";
import Sidebar from "./Sidebar";
import Logo from "./Logo";
import Counter from "./Counter";
import AddItemForm from "./AddItemForm";
import ButtonGroup from "./ButtonGroup";

function App() {

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


  return <>
    <BackgroundHeading />
    <main>
      <Header>
        <Logo />
        <Counter stats={stats} />
      </Header>
      <ItemList items={items} handleDeleteItem={handleDeleteItem} handleToggleItem={handleToggleItem} />
      <Sidebar>
        <AddItemForm onAddItem={handleAddItem} />
        <ButtonGroup
          handleRemoveAllItems={handleRemoveAllItems}
          handleResetToInitial={handleResetToInitial}
          handleMarkAllAsComplete={handleMarkAllAsComplete}
          handleMarkAllAsIncomplete={handleMarkAllAsIncomplete}
        />
      </Sidebar>
    </main>
    <Footer />
  </>;
}

export default App;
