import "./Login.css";
import { useState } from "react";
import { useSignin } from "../../hooks/useSignin";
import LoadingBtn from "../../components/LoadingBtn";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doSignIn, error, isloading } = useSignin();

  const handleSubmit = (e) => {
    e.preventDefault();
    doSignIn(email, password);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
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
        <span>password</span>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      {!isloading ? <button className="btn">login</button> : <LoadingBtn />}
      {error && <div className="error">{error}</div>}
    </form>
  );
}
