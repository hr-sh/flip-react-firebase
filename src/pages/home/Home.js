import "./Home.css";
import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import ProjectList from "../../components/ProjectList";
import Filter from "./Filter";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Home() {
  const { data, error } = useCollection("projects");
  const [currentFilter, setCurrentFilter] = useState("all");
  const { user } = useAuthContext();

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
      {error && <p className="error">{error}</p>}
      {data && <ProjectList projects={projects} />}
    </div>
  );
}
