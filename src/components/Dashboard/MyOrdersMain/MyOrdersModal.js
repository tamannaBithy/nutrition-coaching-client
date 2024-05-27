"use client";

import moment from "moment";
import Image from "next/image";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function MyOrdersModal({ orderData }) {
  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  const { order_details, _id, order_placed_at } = orderData || {};

  const {
    discount,
    grandTotal,
    grandTotalAfterDiscount,
    discountPercentageOnGrandTotal,
  } = order_details || {};

  return (
    <>
      <div
        className='modal fade'
        id='staticBackdrop2'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabindex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'>
        <div className='modal-dialog bg-transparent modal_dialog_orders modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalCenterTitle'>
                Invoice
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'></button>
            </div>
            <div className='px-3 py-4' ref={printRef}>
              <div className='modal-body'>
                <div className='invoice_header'>
                  <Image
                    src='/assets/logoOne.png'
                    alt='GigaDiet Meals Logo'
                    width={150}
                    height={150}
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </div>

                <div className='row'>
                  {/* Order details */}
                  <div className='customer_details col-md-6'>
                    <div className='customer_info my-4'>
                      <div className='title'>
                        <h3>Order Details</h3>
                      </div>
                      <p>
                        Order ID : <strong>{_id}</strong>
                      </p>
                      <p>
                        Payment Method :{" "}
                        <strong>COD - (Cash On Delivery)</strong>
                      </p>
                      <p>
                        Order Placed At :{" "}
                        <strong>
                          {" "}
                          {moment(order_placed_at).format(
                            "'MMMM Do YYYY, h:mm:ss a'"
                          )}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>

                {/* table Main Meals*/}
                {order_details?.mainMealCart?.length > 0 && (
                  <>
                    <div className='table-responsive mt-4'>
                      <h3 className='table_title'>Main Meals</h3>
                      <p className='m-0'>
                        Plan Duration :{" "}
                        <strong>
                          {order_details?.mainMealCart[0]?.plan_duration} Days
                        </strong>
                      </p>
                      <p>
                        Meal Box Size :{" "}
                        <strong>
                          {order_details?.mainMealCart[0]?.box_size}
                        </strong>
                      </p>
                      <table className='table table-hover table-bordered'>
                        {/* table head data */}
                        <thead>
                          <tr>
                            <th scope='col'>Product Name</th>
                            <th scope='col'>Price</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Subtotal</th>
                          </tr>
                        </thead>
                        {/* table body data */}
                        <tbody>
                          {order_details?.mainMealCart?.map((mainMeal) =>
                            mainMeal?.menus?.map((menu, i) => (
                              <tr key={i}>
                                <td scope='row'>
                                  {menu?.mealDetails?.meal_name}
                                </td>
                                <td scope='row'>
                                  {menu?.mealDetails?.regular_price}
                                </td>
                                <td scope='row'>{menu?.quantity}</td>
                                <td scope='row'>{menu?.sub_total}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Main Meals Summary*/}
                    <div className='card-body'>
                      <div className='row flex-column-reverse flex-md-row row-gap-4 row-gap-md-0'>
                        <div className='col-md-7 col-lg-7 d-flex align-items-end'></div>

                        <div className='col-md-5 col-lg-5 ml-auto'>
                          <table className='table table-clear'>
                            <tbody>
                              <tr>
                                <td className='left'>
                                  <strong>Subtotal</strong>
                                </td>
                                <td className='right'>
                                  {order_details?.mainMealCart[0]?.subtotal} IQD
                                </td>
                              </tr>
                              <tr>
                                <td className='left'>
                                  <strong>
                                    Discount (
                                    {
                                      order_details?.mainMealCart[0]
                                        ?.discountPercentage
                                    }
                                    %)
                                  </strong>
                                </td>
                                <td className='right'>
                                  {order_details?.mainMealCart[0]?.discount}
                                </td>
                              </tr>
                              <tr>
                                <td className='left'>
                                  <strong>Total</strong>
                                </td>
                                <td className='right'>
                                  <strong>
                                    {" "}
                                    {
                                      order_details?.mainMealCart[0]
                                        ?.subtotalAfterDiscount
                                    }{" "}
                                    IQD
                                  </strong>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* table Offered Meals*/}
                {order_details?.offeredMealCart?.length > 0 && (
                  <>
                    <div className='table-responsive mt-4'>
                      <h3 className='table_title'>Offered Meals</h3>
                      <table className='table table-hover table-bordered'>
                        {/* table head data */}
                        <thead>
                          <tr>
                            <th scope='col'>Package Name</th>
                            <th scope='col'>Price</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Subtotal</th>
                          </tr>
                        </thead>
                        {/* table body data */}
                        <tbody>
                          {order_details?.offeredMealCart?.map((offeredMeal) =>
                            offeredMeal?.menus?.map((menu, i) => (
                              <tr key={i}>
                                <td scope='row'>
                                  {menu?.mealDetails?.package_name}
                                </td>
                                <td scope='row'>{menu?.mealDetails?.price}</td>
                                <td scope='row'>{menu?.quantity}</td>
                                <td scope='row'>{menu?.sub_total}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Offered Meals Summary*/}
                    <div className='card-body'>
                      <div className='row flex-column-reverse flex-md-row row-gap-4 row-gap-md-0'>
                        <div className='col-md-7 col-lg-7 d-flex align-items-end'></div>

                        <div className='col-md-5 col-lg-5 ml-auto'>
                          <table className='table table-clear'>
                            <tbody>
                              <tr>
                                <td className='left'>
                                  <strong>Subtotal</strong>
                                </td>
                                <td className='right'>
                                  {order_details?.offeredMealCart[0]?.subtotal}{" "}
                                  IQD
                                </td>
                              </tr>
                              <tr>
                                <td className='left'>
                                  <strong>
                                    Discount (
                                    {
                                      order_details?.offeredMealCart[0]
                                        ?.discountPercentage
                                    }
                                    %)
                                  </strong>
                                </td>
                                <td className='right'>
                                  {order_details?.offeredMealCart[0]?.discount}
                                </td>
                              </tr>
                              <tr>
                                <td className='left'>
                                  <strong>Total</strong>
                                </td>
                                <td className='right'>
                                  <strong>
                                    {" "}
                                    {
                                      order_details?.offeredMealCart[0]
                                        ?.subtotalAfterDiscount
                                    }{" "}
                                    IQD
                                  </strong>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* table Customized Meals*/}
                {order_details?.customizedMealCart?.length > 0 && (
                  <div className='table-responsive mt-4'>
                    <h3 className='table_title'>Customized Meals</h3>
                    <table className='table table-hover table-bordered'>
                      {/* table head data */}
                      <thead>
                        <tr>
                          <th scope='col'>Meal Day</th>
                          <th scope='col'>Meal Name</th>
                          <th scope='col'>Quantity</th>
                          <th scope='col'>Price</th>
                        </tr>
                      </thead>
                      {/* table body data */}
                      <tbody>
                        {order_details?.customizedMealCart[0].mealsByDay
                          ?.slice() // Create a shallow copy of the array
                          .sort((a, b) => {
                            // Extract the numeric part from day strings (e.g., day1, day2)
                            const dayA = parseInt(a.day.replace("day", ""));
                            const dayB = parseInt(b.day.replace("day", ""));
                            // Compare numerically
                            return dayA - dayB;
                          })
                          ?.map((customizedMeal, i) => {
                            const dayNumber = (i + 1).toString();
                            return (
                              <tr key={customizedMeal?._id}>
                                <td scope='row'>
                                  {customizedMeal?.day === `day${dayNumber}` &&
                                    `Day - ${dayNumber}`}
                                </td>
                                <td scope='row'>
                                  {customizedMeal?.meals?.map((meal, i) => {
                                    return (
                                      <div key={i}>{meal?.meal?.meal_name}</div>
                                    );
                                  })}
                                </td>
                                <td scope='row'>
                                  {customizedMeal?.meals?.length}
                                </td>
                                <td scope='row'>
                                  {customizedMeal?.price_for_specific_day}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* table Grandtotal*/}
                <div className='card-body mt-4'>
                  <div className='row flex-column-reverse flex-md-row row-gap-4 row-gap-md-0'>
                    <div className='col-md-7 col-lg-7 d-flex align-items-end'></div>

                    <div className='col-md-5 col-lg-5 ml-auto'>
                      <table className='table table-clear'>
                        <h5 className='fw-bolder mb-4'>Calculation Summary</h5>
                        <tbody>
                          <tr>
                            <td className='left'>
                              <strong>Subtotal</strong>
                            </td>
                            <td className='right'>{grandTotal} IQD</td>
                          </tr>
                          <tr>
                            <td className='left'>
                              <strong>
                                Discount ({discountPercentageOnGrandTotal}%)
                              </strong>
                            </td>
                            <td className='right'>{discount}</td>
                          </tr>
                          <tr>
                            <td className='left'>
                              <strong>Grand Total</strong>
                            </td>
                            <td className='right'>
                              <strong>{grandTotalAfterDiscount} IQD</strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='modal-footer'>
              <button onClick={handlePrint} type='button' className='btn-print'>
                Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
