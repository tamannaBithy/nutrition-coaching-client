import { useEffect, useState } from "react";
import { useUpdateMealDurationMutation } from "../../../../redux/features/queries/ADMIN_CUSTOMIZED_MEAL_API";

export default function OrderRequestModal({ mealData }) {
  const [updateMealDuration] = useUpdateMealDurationMutation();
  // State variables to hold form field values
  const [calories, setCalories] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [protein, setProtein] = useState("");
  const [mealPerDay, setMealPerDay] = useState("");
  const [mealDurationRepeat, setMealDurationRepeat] = useState("");

  // Set default field values when mealData changes
  useEffect(() => {
    if (mealData) {
      setCalories(mealData.calories.toString());
      setCarbs(mealData.carbs.toString());
      setFat(mealData.fat.toString());
      setProtein(mealData.protein.toString());
      setMealPerDay(mealData.mealPerDay.toString());
      setMealDurationRepeat(mealData.meal_duration_repeat.toString());
    }
  }, [mealData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert input values to numbers
    const numericCalories = parseFloat(calories);
    const numericCarbs = parseFloat(carbs);
    const numericFat = parseFloat(fat);
    const numericProtein = parseFloat(protein);
    const numericMealPerDay = parseInt(mealPerDay);
    const numericMealDurationRepeat = parseInt(mealDurationRepeat);
    // Check if conversion was successful
    if (
      isNaN(numericCalories) ||
      isNaN(numericCarbs) ||
      isNaN(numericFat) ||
      isNaN(numericProtein) ||
      isNaN(numericMealPerDay) ||
      isNaN(numericMealDurationRepeat)
    ) {
      console.error("input values are not valid numbers");
      return;
    }
    const data = {
      calories: numericCalories,
      carbs: numericCarbs,
      fat: numericFat,
      protein: numericProtein,
      mealPerDay: numericMealPerDay,
      meal_duration_repeat: numericMealDurationRepeat,
    };
    const { data: updatedMealData } = await updateMealDuration({
      id: mealData?._id,
      data,
    });
    console.log(updatedMealData);
  };

  return (
    <>
      <div
        className='modal fade'
        id='staticBackdrop4'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabindex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'>
        <div className='modal-dialog bg-transparent modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalCenterTitle'>
                Order Request
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'></button>
            </div>
            <div className='px-3 py-4'>
              <div className='modal-body'>
                <form onSubmit={handleSubmit}>
                  <div className='row g-3 pt-4'>
                    {/* calories field */}
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                      <div className='mb-2 update_blog_title_fields'>
                        <label htmlFor='calories'>Calories</label>
                        <input
                          type='text'
                          name='calories'
                          id='calories'
                          className='rounded form-control'
                          value={calories}
                          onChange={(e) => setCalories(e.target.value)}
                          disabled
                        />
                      </div>
                    </div>
                    {/* carbs field */}
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                      <div className='mb-2 update_blog_title_fields'>
                        <label htmlFor='carbs'>Carbs</label>
                        <input
                          type='text'
                          name='carbs'
                          id='carbs'
                          className='rounded form-control'
                          value={carbs}
                          onChange={(e) => setCarbs(e.target.value)}
                          disabled
                        />
                      </div>
                    </div>
                    {/* fat field */}
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                      <div className='mb-2 update_blog_title_fields'>
                        <label htmlFor='fat'>Fat</label>
                        <input
                          type='text'
                          name='fat'
                          id='fat'
                          className='rounded form-control'
                          value={fat}
                          onChange={(e) => setFat(e.target.value)}
                          disabled
                        />
                      </div>
                    </div>
                    {/* protein field */}
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                      <div className='mb-2 update_blog_title_fields'>
                        <label htmlFor='protein'>Protein</label>
                        <input
                          type='text'
                          name='protein'
                          id='protein'
                          className='rounded form-control'
                          value={protein}
                          onChange={(e) => setProtein(e.target.value)}
                          disabled
                        />
                      </div>
                    </div>
                    {/* mealPerDay field */}
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                      <div className='mb-2 update_blog_title_fields'>
                        <label htmlFor='mealPerDay'>Meal Per Day</label>
                        <input
                          type='text'
                          name='mealPerDay'
                          id='mealPerDay'
                          className='rounded form-control'
                          value={mealPerDay}
                          onChange={(e) => setMealPerDay(e.target.value)}
                          disabled
                        />
                      </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                      <div className='mb-2 update_blog_title_fields'>
                        <label htmlFor='meal_duration_repeat'>
                          Meal Duration Repeat
                        </label>
                        <input
                          type='text'
                          name='meal_duration_repeat'
                          id='meal_duration_repeat'
                          className='rounded form-control'
                          value={mealDurationRepeat}
                          onChange={(e) =>
                            setMealDurationRepeat(e.target.value)
                          }
                          max={7}
                          min={0}
                          placeholder='Max Value 7 Min Value 0'
                        />
                      </div>
                    </div>
                    {/* Submit button */}
                    <div className='col-12 update_blog_btn py-3 d-flex align-items-center w-100 justify-content-center'>
                      <input
                        type='submit'
                        className='p-2 w-25'
                        value='Send'
                        data-bs-dismiss='modal'
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
