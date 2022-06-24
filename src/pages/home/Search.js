import "./Search.css";

export default function Search({ search, setSearch }) {
  return (
    <div className="search">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Type to search"
      />
    </div>
  );
}
