import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Select from "react-select";
import { useCollection } from "../../hooks/useCollection";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import LoadingBtn from "../../components/LoadingBtn";
import { useDocument } from "../../hooks/useDocument";

import "./Create.css";

const categories = [
  { value: "development", label: "development" },
  { value: "design", label: "design" },
  { value: "sales", label: "sales" },
  { value: "marketing", label: "marketing" },
];

export default function Create() {
  const id = useLocation().pathname.split("/")[3];
  // console.log(id);
  const { data: project, error: projectError } = useDocument("projects", id);

  const { data } = useCollection("users");
  const [users, setUsers] = useState([]);
  const { user } = useAuthContext();
  const { isloading, error, success, doAdd, doUpdate } =
    useFirestore("projects");

  const [formError, setFormError] = useState(null);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState(null);
  const [assignedUsers, setAssignedUsers] = useState([]);

  const history = useHistory();

  //yyyy/mm/dd
  const current = new Date();
  const min = current.toISOString().split("T")[0];
  const max = new Date(current.setMonth(current.getMonth() + 3))
    .toISOString()
    .split("T")[0];

  useEffect(() => {
    if (data) {
      const options = data.map((u) => ({ value: u, label: u.displayName }));
      setUsers(options);
    }
    if (data && project && project !== undefined) {
      setTitle(project.title);
      setDetails(project.details);

      setDueDate(project.dueDate.toDate().toISOString().split("T")[0]);

      const dd = categories.find((c) => c.value === project.category);
      console.log(dd);
      setCategory(categories.find((c) => c.value === project.category));

      const d = data
        .map((u) => ({ value: u, label: u.displayName }))
        .filter((o) => {
          let c = false;
          project.assignedUsersList.forEach((u) => {
            if (u.id === o.value.id) {
              c = true;
            }
          });
          return c;
        });

      setAssignedUsers(d);
    }
    if (success) {
      // redirect user to home "/"
      history.push("/");
    }
  }, [data, success, history, project]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError("please select a project category");
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError("please assign the project to atleast one user");
      return;
    }

    const assignedUsersList = assignedUsers.map((u) => ({
      displayName: u.value.displayName,
      photoURL: u.value.photoURL,
      id: u.value.id,
    }));

    const project = {
      title,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy: {
        displayName: user.displayName,
        photoURL: user.photoURL,
        id: user.uid,
      },
      createdAt: timestamp.fromDate(new Date()),
      assignedUsersList,
    };

    if (id) {
      doUpdate(project, id);
    } else {
      doAdd(project);
    }
  }; //handlesubmit ends here

  return (
    <div className="create-form">
      <h2 className="page-title">
        {id ? "Edit project" : "Create a new project"}
      </h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>project title*</span>
          <input
            required
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>project details*</span>
          <textarea
            required
            type="text"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          ></textarea>
        </label>
        <label>
          <span>set duedate*</span>
          <input
            required
            type="text"
            value={dueDate}
            placeholder="Select a date"
            min={min}
            max={max}
            onChange={(e) => setDueDate(e.target.value)}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </label>
        <label>
          <span>project category*</span>
          <Select
            value={category}
            options={categories}
            onChange={(option) => setCategory(option)}
          />
        </label>
        <label>
          <span>assign to*</span>
          <Select
            value={assignedUsers}
            options={users}
            onChange={(option) => setAssignedUsers(option)}
            isMulti
          />
        </label>
        {!isloading ? (
          <button className="btn">
            {id ? "update project" : "add project"}
          </button>
        ) : (
          <LoadingBtn />
        )}
        {formError && <p className="error">{formError}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
