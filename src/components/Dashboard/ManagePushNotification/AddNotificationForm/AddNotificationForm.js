import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import "./AddNotificationForm.css";
export default function AddNotificationForm() {
  const { locale } = useParams();
  const t = useTranslations("Dashboard");

  return (
    <div>
      <form action='#'>
        <div className='row g-3 pt-4'>
          {/* language preference */}
          <div className='col-lg-6 col-md-12 col-sm-12'>
            <div className='show_per_page_section mb-2'>
              <label htmlFor='lang_preference'>
                {t("ManageNotification.inputs.languagePreference")}
              </label>

              {/* Select for how many data per page */}
              <select
                className='form-select'
                aria-label='Default select example'
                id='lang_preference'
                // value={showPerPage}
                // onChange={handleShowPerPageChange}
              >
                <option value='ar'>العربية</option>
                <option value='en'>English</option>
              </select>
            </div>
          </div>

          {/* notification name field */}
          <div className='col-lg-6 col-md-12 col-sm-12'>
            <div className='mb-2 notification_name_fields'>
              <label htmlFor='notification_name'>
                {t("ManageNotification.inputs.notificationName.label")}
                <sup className='text-danger'>*</sup>
              </label>
              <input
                type='text'
                name='notificationName'
                id='notification_name'
                className='rounded form-control'
                placeholder={t(
                  "ManageNotification.inputs.notificationName.placeHolder"
                )}
                // value={packageName}
                // onChange={handlePackageNameChange}
                required
              />
            </div>
          </div>

          {/* notification description field */}
          <div className='col-lg-12 col-md-12 col-sm-12'>
            <div className='mb-2 notification_description_fields'>
              <label htmlFor='notification_description'>
                {t("ManageNotification.inputs.notificationDescription.label")}
                <sup className='text-danger'>*</sup>
              </label>
              <div className='d-flex align-items-center notification_description_fields rounded'>
                <textarea
                  type='text'
                  className='form-control border-0'
                  name='notificationDescription'
                  id='notification_description'
                  // value={offeredMeals[index].ingredients}
                  // onChange={(e) => handleIngredientsChange(index, e)}
                  placeholder={t(
                    "ManageNotification.inputs.notificationDescription.placeHolder"
                  )}
                  required
                />
              </div>
            </div>
          </div>

          {/* submit button */}
          <div className=' add_notification_btn py-3 d-flex align-items-center w-100 justify-content-center'>
            <input
              type='submit'
              className='p-2 w-25'
              value={t("ManageNotification.inputs.buttonText")}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
