import "./Profile.css";
import { useState } from "react";
import { useDocument } from "../../hooks/useDocument";

import LoadingBtn from "../../components/LoadingBtn";
import Avatar from "../../components/Avatar";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import ProjectList from "../../components/ProjectList";

export default function Profile() {
  const [edit, setEdit] = useState(false);

  const { user } = useAuthContext();
  const id = useLocation().pathname.slice(6);
  const { data, error } = useDocument("users", id);
  const { data: pData, error: err } = useCollection(
    "projects",
    `createdBy.id,==,${id}`,
    "createdAt,desc"
  );

  if (!data) {
    return <LoadingBtn />;
  }

  if (error) {
    return <p>cant find user</p>;
  }

  console.log(pData);

  return (
    <div className="profile">
      {data && (
        <>
          <div className="banner">
            <Avatar src={data.photoURL} />
            <div>
              <h2 className="name">{data.displayName}</h2>
              {user.uid === data.id && (
                <button onClick={() => setEdit(true)}>update user</button>
              )}
            </div>
          </div>
          <div className="user-projects-list">
            <h2 className="page-title">Created projects</h2>
            {err && <p className="error">{err}</p>}

            {pData && <ProjectList projects={pData} />}
          </div>
        </>
      )}
    </div>
  );
}
