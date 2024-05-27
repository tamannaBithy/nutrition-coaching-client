import "./CheckOutInput.css";

export default function CheckOutTextField({ title, ...attributes }) {
  return (
    <>
      <label htmlFor={title} className=''>
        {title}
      </label>
      <textarea className='' {...attributes} />
    </>
  );
}
