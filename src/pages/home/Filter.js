import "./Filter.css";
import Select from "react-select";
import Search from "./Search";

const categories = [
  { value: "all", label: "all" },
  { value: "development", label: "development" },
  { value: "design", label: "design" },
  { value: "sales", label: "sales" },
  { value: "marketing", label: "marketing" },
];

const customStyle = {
  control: (provided) => ({
    ...provided,
    width: 200,
    fontSize: "1rem",
    backgroundColor: "#fbfbfb",
    boxShadow: "0px 0px 2px 0px rgb(0 0 0 / 20%)",
    outline: "none",
    border: 0,
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: "1rem",
    color: state.isFocused || state.isSelected ? "#8d69f1" : "#333",
    background: state.isSelected ? "rgba(141, 105, 241, 0.1)" : "#fbfbfb",
  }),
};

export default function Filter({ category, setCategory, search, setSearch }) {
  return (
    <div className="filter-bar">
      <nav>
        <Search search={search} setSearch={setSearch} />

        <div className="select">
          <Select
            styles={customStyle}
            options={categories}
            onChange={(option) => setCategory(option.value)}
          />
        </div>
      </nav>
    </div>
  );
}
