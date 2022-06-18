import "./Home.css";
import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import ProjectGrid from "../../components/ProjectGrid";
import Filter from "./Filter";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";
import AddIcon from "../../assets/add_icon.svg";
import ListIcon from "../../assets/list_icon.svg";
import GridIcon from "../../assets/grid_icon.svg";
import ProjectList from "../../components/ProjectList";
import { useViewContext } from "../../hooks/useViewContext";

export default function Home() {
  const { data, error } = useCollection("projects");
  const [currentFilter, setCurrentFilter] = useState("all");
  const { user } = useAuthContext();
  const { grid, setGrid } = useViewContext();

  let projects = data;

  if (currentFilter !== "all") {
    if (currentFilter === "me") {
      projects = data.filter((d) => d.createdBy.id === user.uid);
    } else {
      projects = data.filter((d) => d.category === currentFilter);
    }
  }
  return (
    <div className="home">
      <h2 className="page-title">Home</h2>
      <Filter
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
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
