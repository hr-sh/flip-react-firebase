import { Oval } from "react-loading-icons";

export default function LoadingBtn() {
  return (
    <button
      disabled
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        color: "var(--primary-color)",
        outline: "none",
        border: "none",
        background: "none",
      }}
    >
      <Oval
        stroke="#8d69f1"
        style={{
          width: "30px",
          height: "30px",
        }}
      />
    </button>
  );
}
