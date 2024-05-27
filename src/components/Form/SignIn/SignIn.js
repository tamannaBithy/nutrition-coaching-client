"use client";

import PassInput from "@/components/Common/PassInput";
import TextInput from "@/components/Common/TextInput";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SocialLogin from "../SocialLogin/SocialLogin";
import "./SignIn.css";

export default function SignIn() {
  const t = useTranslations("Login");

  const { locale } = useParams();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [emailPhone, setEmailPhone] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailPhoneChange = (e) => {
    setEmailPhone(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const url = new URL(window.location.href);

      /* Redirect to the previous page */
      const callbackUrl =
        url.href === `${url.origin}${url.pathname}`
          ? `${url.origin}/${locale}`
          : url.searchParams.get("callbackUrl");
      const res = await signIn("credentials", {
        emailOrPhone: emailPhone,
        password: password,
        callbackUrl,
      });
    } catch (error) {
      console.log("Error during sign-in:", error);
    }
  }

  return (
    <div className=' px-5 signIn_container text-center'>
      <div className=' pt-3 SignIn_logo mx-auto pb-3'>
        <Image
          src='/assets/logoOne.png'
          alt='GigaDiet Meals Logo'
          width={200}
          height={200}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>

      {/* Form Start */}
      <form className='pt-4 pb-3' onSubmit={handleFormSubmit}>
        <div className='mb-2'>
          <TextInput
            type='text'
            className='form-control'
            placeholder={t("inputs.placeholderOne")}
            required
            value={emailPhone}
            onChange={handleEmailPhoneChange}
          />
        </div>

        <div className='mb-2 password_input_group'>
          <PassInput
            type={showPassword ? "text" : "password"}
            className='form-control'
            placeholder={t("inputs.placeholderTwo")}
            value={password}
            onChange={handlePasswordChange}
          />
          <span className='open_eye_icon' onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className='text-start pb-2 '>
          <Link
            className='text-decoration-none forgot_link'
            href='/reset-password'>
            {t("links.one")}
          </Link>
        </div>

        <div className='mt-4'>
          <button
            type='submit'
            className='common_btn form-control  mx-auto rounded-5 '>
            {t("signInBtn")}
          </button>
        </div>
      </form>

      <Link href='/register' className='text-decoration-none'>
        <strong className='signUp_link'>{t("links.two")}</strong>
      </Link>
      <hr />

      {/* social media authentication */}
      <SocialLogin />

      {/* agreement text */}
      <div className='pt-5 pb-3'>
        <p className='agreement_txt'>
          {t("tramsAndCondition.one")}{" "}
          <strong>{t("tramsAndCondition.two")}</strong>{" "}
          {t("tramsAndCondition.three")}{" "}
          <strong>{t("tramsAndCondition.four")}</strong>
        </p>
      </div>
    </div>
  );
}
