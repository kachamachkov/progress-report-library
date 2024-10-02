export default function FormWrapper({ title, children }) {
  return (
    <>
      <h2>{title}</h2>
      <div>{children}</div>
    </>
  );
}
