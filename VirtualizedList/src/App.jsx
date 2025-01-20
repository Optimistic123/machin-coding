import VirtualizedList from './VirtualizedList.jsx';

const App = () => {
  const items = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);

  return (
    <div>
      <h1>Virtualized List Demo</h1>
      <VirtualizedList items={items} itemHeight={50} containerHeight={400} buffer={5} />
      <div>Element after the list</div>
    </div>
  );
};

export default App;
