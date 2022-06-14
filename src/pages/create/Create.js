import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { useCollection } from "../../hooks/useCollection";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

import "./Create.css";

const categories = [
  { value: "development", label: "development" },
  { value: "design", label: "design" },
  { value: "sales", label: "sales" },
  { value: "marketing", label: "marketing" },
];

export default function Create() {
  const { data } = useCollection("users");
  const [users, setUsers] = useState([]);
  const { user } = useAuthContext();
  const { isloading, error, success, doAdd } = useFirestore("projects");

  const [formError, setFormError] = useState(null);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);

  const history = useHistory();

  useEffect(() => {
    if (data) {
      const options = data.map((u) => ({ value: u, label: u.displayName }));
      setUsers(options);
    }
    if (success) {
      // redirect user to home "/"
      history.push("/");
    }
  }, [data, success, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);
    // console.log(title, details, dueDate, category, assignedUsers);
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
      category,
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

    doAdd(project);
  }; //handlesubmit ends here

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>project title:</span>
          <input
            required
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>project details:</span>
          <textarea
            required
            type="text"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          ></textarea>
        </label>
        <label>
          <span>set duedate:</span>
          <input
            required
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>
        <label>
          <span>proect category:</span>
          <Select
            options={categories}
            onChange={(option) => setCategory(option.value)}
          />
        </label>
        <label>
          <span>assign to:</span>
          <Select
            options={users}
            onChange={(option) => setAssignedUsers(option)}
            isMulti
          />
        </label>
        {!isloading && <button className="btn">Add project</button>}
        {isloading && (
          <button className="btn" disabled>
            saving..
          </button>
        )}
        {formError && <p className="error">{formError}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
