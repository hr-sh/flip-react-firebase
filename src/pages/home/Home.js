import "./Home.css";
import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import ProjectGrid from "../../components/ProjectGrid";
import Filter from "./Filter";
import { Link } from "react-router-dom";
import AddIcon from "../../assets/add_icon.svg";
import ListIcon from "../../assets/list_icon.svg";
import GridIcon from "../../assets/grid_icon.svg";
import ProjectList from "../../components/ProjectList";
import { useViewContext } from "../../hooks/useViewContext";

export default function Home() {
  const [search, setSearch] = useState("");
  const { data, error } = useCollection("projects");
  const [category, setCategory] = useState("all");
  const { grid, setGrid } = useViewContext();

  let projects = data;

  // filter cate
  if (category !== "all") {
    projects = data.filter((d) => d.category === category);
  }
  // filter searchterm
  if (search !== "") {
    projects = projects.filter((p) => p.title.includes(search));
  }

  return (
    <div className="home">
      <h2 className="page-title">Dashboard</h2>
      <Filter
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
      />
      <Link className="create-post-mobile" to="/create">
        <img src={AddIcon} alt="add new" />
        <span>click to add new project</span>
      </Link>
      <div className="change-view-bar">
        <button disabled={!grid} onClick={() => setGrid(false)}>
          <img src={ListIcon} alt="" />
        </button>
        <button disabled={grid} onClick={() => setGrid(true)}>
          <img src={GridIcon} alt="" />
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {data && (
        <>
          {grid ? (
            <ProjectGrid projects={projects} />
          ) : (
            <ProjectList projects={projects} />
          )}
        </>
      )}
    </div>
  );
}
