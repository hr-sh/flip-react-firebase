import "./Filter.css";

const filters = ["all", "me", "development", "design", "marketing", "sales"];

export default function Filter({ currentFilter, setCurrentFilter }) {
  return (
    <div className="filter-bar">
      <nav>
        <div className="text">Filter by: </div>
        {filters.map((f) => (
          <div
            key={f}
            className={`filter-item ${currentFilter === f && "active"}`}
            onClick={() => setCurrentFilter(f)}
          >
            {f}
          </div>
        ))}
      </nav>
    </div>
  );
}
