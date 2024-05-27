export default function Button({ title, ...attributes }) {
  return (
    <>
      <input value={title} {...attributes} />
    </>
  );
}
