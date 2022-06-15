import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [pic, setPic] = useState(null);
  const [fileError, setFileError] = useState(null);
  const { doSignUp, error, isloading } = useSignup();

  const handleFileChange = (e) => {
    setPic(null);
    let file = e.target.files[0];

    if (!file) {
      setFileError("Please select a file");
      return;
    }
    if (!file.type.includes("image")) {
      setFileError("file must be a image");
      return;
    }
    if (file.size > 500000) {
      setFileError("Image file size must be less than 500kb");
      return;
    }

    setFileError(null);
    setPic(file);
    console.log("picture updated");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    doSignUp(email, password, displayName, pic);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="head-signup">
        <h2>Sign up</h2>
        <div className="view-image">
          {!pic && <div className="placeholder"></div>}
          {pic && <img src={URL.createObjectURL(pic)} alt="user profile" />}
        </div>
      </div>
      <label>
        <span>email:</span>
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>display name:</span>
        <input
          type="text"
          required
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>profile image:</span>
        <input type="file" required onChange={handleFileChange} />
        {fileError && <div className="error">{fileError}</div>}
      </label>

      {!isloading ? (
        <button className="btn">sign up</button>
      ) : (
        <button disabled className="btn">
          loading..
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
}
