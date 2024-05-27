import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { useCreateSessionMutation } from "../../../../redux/features/queries/BOOK_SESSION_API";
export default function BookAppointmentModal({
  translatedStrings,
  instructor,
  onClose,
}) {
  const t = useTranslations("NutritionCoaching");
  const { locale } = useParams();
  const [createSession] = useCreateSessionMutation();
  const [note_for_instructor, setNoteForInstructor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      instructor: instructor?._id,
      note_for_instructor,
    };
    const { data: sessionData } = await createSession(data);
    if (sessionData?.status) {
      Swal.fire({
        icon: "success",
        title: data?.message[locale],
        showConfirmButton: false,
        timer: 2500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: data?.message[locale],
        showConfirmButton: false,
        timer: 2500,
      });
    }
    setNoteForInstructor("");
  };
  return (
    <div
      className='modal fade'
      id='staticBackdrop5'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabindex='-1'
      aria-labelledby='staticBackdropLabel'
      aria-hidden='true'>
      <div
        class='modal-dialog bookInstructorModal modal-dialog-centered'
        role='document'>
        <div class='modal-content'>
          <div class='modal-header'>
            <h5 class='modal-title' id='exampleModalLongTitle'>
              {translatedStrings.sessionBookingTitle}
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
              onClick={onClose}></button>
          </div>
          <div class='modal-body'>
            {/* begin: form */}
            <form onSubmit={handleSubmit}>
              <div className='row g-3 pt-4'>
                {/* Instructor Name */}
                <div className='col-lg-12 col-md-12 col-sm-12'>
                  <div className='mb-2 blog_description_field'>
                    <label htmlFor='blog_description'>
                      {translatedStrings.sessionBookingNote}
                      <sup className='text-danger'>*</sup>
                    </label>

                    <div className='d-flex align-items-center input_fields_area rounded'>
                      <textarea
                        rows='4'
                        type='text'
                        className='form-control '
                        name='blogDescription'
                        id='blog_description'
                        value={note_for_instructor}
                        onChange={(e) => setNoteForInstructor(e.target.value)}
                        placeholder={
                          translatedStrings.sessionBookingPlaceholder
                        }
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div
                  className=' add_blog_btn py-3 d-flex align-items-center w-100 justify-content-center'
                  data-bs-dismiss='modal'>
                  <input
                    type='submit'
                    className='p-2 w-25'
                    value={translatedStrings.btn}
                  />
                </div>
              </div>
            </form>
            {/* end: form */}
          </div>
        </div>
      </div>
    </div>
  );
}
