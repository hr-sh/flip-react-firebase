import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import "./Signup.css";
import InfoIcon from "../../assets/info_icon.svg";
import LoadingBtn from "../../components/LoadingBtn";
import AddImage from "../../components/AddImage";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState(null);
  const [fileError, setFileError] = useState(null);
  const { doSignUp, error, isloading } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();

    doSignUp(email, password, email.split("@")[0], pic);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="head">
        <h2 className="page-title">Sign up</h2>
        <AddImage
          title="Sign up"
          pic={pic}
          setPic={setPic}
          setFileError={setFileError}
        />
      </div>
      <label>
        <span>email</span>
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <img
          src={InfoIcon}
          alt="info for password"
          title="password must be atleat 6 letters long"
        />

        <span>password</span>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {fileError && <div className="error">{fileError}</div>}

      {!isloading ? <button className="btn">sign up</button> : <LoadingBtn />}
      {error && <div className="error">{error}</div>}
    </form>
  );
}
