import "./RadioCheckInput.css";

export default function RadioCheckInput({ title, ...attributes }) {
  return (
    <>
      <div className='form-check mb-3'>
        <input className='form-check-input' type='radio' {...attributes} />
        <label className='form-check-label ms-2'>{title}</label>
      </div>
    </>
  );
}
