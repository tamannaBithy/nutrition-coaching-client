import "./CheckOutInput.css";

export default function CheckOutInput({ title, ...attributes }) {
  return (
    <>
      <label htmlFor={title} className=''>
        {title}
      </label>
      <input className='' {...attributes} />
    </>
  );
}
