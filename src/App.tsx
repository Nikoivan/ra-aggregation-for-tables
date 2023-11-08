import Tables from "./components/Tables/Tables";

const url =
  "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hoc/aggregation/data/data.json";

export default function App() {
  return (
    <div id="app">
      <Tables fetchUrl={url} />
    </div>
  );
}
