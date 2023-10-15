export function BackButton({ onClick }) {
  return (
    <img
      src={` https://test.create.diagnal.com/images/Back.png`}
      alt={"search"}
      style={{ height: "20px", width: "20px", marginRight: "16px" }}
      onClick={onClick}
    />
  );
}
