export default function FormWrapper({ title, children }) {
  return (
    <>
      <h2 className="page-title">{title}</h2>
      <div className='dropdown'>{children}</div>
    </>
  );
}
