"use client";

import CheckOutInput from "@/components/Common/CheckOutInput";
import CheckOutTextField from "@/components/Common/CheckOutTextField";
import RadioCheckInput from "@/components/Common/RadioCheckInput";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { usePlaceOrderMutation } from "../../../../redux/features/queries/ORDER_API";
import "./CheckOutForm.css";

export default function CheckOutForm() {
  const [placeOrder] = usePlaceOrderMutation();
  const t = useTranslations("Checkout");

  const [shippingAddress, setShippingAddress] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash Payment Delivery");

  // Fetching selected preferences from localStorage or defaulting to an empty array
  const number_of_meals_per_day =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("selectedMealsPerDay")) || ""
      : "";
  const plan_duration =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("selectedPlanDuration")) || ""
      : "";

  const handleShippingAddressChange = (e) => {
    setShippingAddress(e.target.value);
  };

  const handleOrderNotesChange = (e) => {
    setOrderNotes(e.target.value);
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
    const data = {
      delivery_address: shippingAddress,
      note_from_user: orderNotes,
      payment_method: paymentMethod,
      plan_duration,
      number_of_meals_per_day,
    };
    const { data: placedData } = await placeOrder(data);
    console.log(placedData);
  }

  return (
    <div className='container py-5 '>
      <form action='#' className='checkout_form_container'>
        <div className='row gap-2'>
          <div className='col-lg-6 col-md-12 col-sm-12 my-5'>
            <div className='left_column_title'>
              <h2>{t("title")}</h2>
            </div>

            <div className='row '>
              <div className='col-lg-12 col-md-12 col-sm-12 mt-3'>
                <div className='mb-2'>
                  <CheckOutInput
                    type='text'
                    className='form-control w-100'
                    required
                    title={t("form.label.one")}
                    placeholder={t("form.label.placeholderOne")}
                    value={shippingAddress}
                    onChange={handleShippingAddressChange}
                  />
                </div>
              </div>

              <div className='col-lg-12 col-md-12 col-sm-12 mt-3'>
                <div className='mb-2'>
                  <CheckOutTextField
                    type='text'
                    className='form-control w-100'
                    title={t("form.label.two")}
                    placeholder={t("form.label.placeholderTwo")}
                    value={orderNotes}
                    onChange={handleOrderNotesChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-5 col-md-12 col-sm-12 my-5'>
            <div className='right_column_title'>
              <h2>{t("paymentMethods.title")}</h2>
            </div>

            <div className='payment_section p-3 '>
              <div className='border-bottom '>
                <RadioCheckInput
                  title={t("paymentMethods.methods.one.title")}
                  name='paymentMethod'
                  id='cashPaymentDelivery'
                  checked={paymentMethod === "Cash Payment Delivery"}
                  onChange={() => setPaymentMethod("Cash Payment Delivery")}
                />
                <p className='payment_method_txt'>
                  {t("paymentMethods.methods.one.paragraph")}
                </p>
              </div>

              <div className='border-bottom '>
                <RadioCheckInput
                  title={t("paymentMethods.methods.two.title")}
                  name='onlineBanking'
                  id='onlineBanking'
                  disabled
                />
                <p className='payment_method_txt'>
                  {t("paymentMethods.methods.two.paragraph")}
                </p>
              </div>

              <div className=' py-2'>
                <RadioCheckInput
                  title={t("paymentMethods.methods.three.title")}
                  name='mobilePayments'
                  id='mobilePayments'
                  disabled
                />
                <p className='payment_method_txt'>
                  {t("paymentMethods.methods.three.paragraph")}
                </p>
              </div>
            </div>

            <button
              type='submit'
              className='place_order_btn form-control  mt-3 rounded-2 text-white'
              onClick={handleFormSubmit}>
              {t("button")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
