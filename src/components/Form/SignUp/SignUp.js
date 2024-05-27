"use client";

import PassInput from "@/components/Common/PassInput";
import TextInput from "@/components/Common/TextInput";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SocialLogin from "../SocialLogin/SocialLogin";
import "./SignUp.css";

export default function SignUp() {
  const t = useTranslations("Register");

  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:8000/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, email, password }),
      });
      const data = await response.json();

      if (data.status === true) {
        router.push("/login");
      }
    } catch (error) {
      throw new Error(`Failed to register user: ${error.message}`);
    }
  }

  return (
    <div className=" px-5 signup_container text-center">
      <div className=" pt-3 Signup_logo mx-auto pb-3">
        <Image
          src="/assets/logoOne.png"
          alt="GigaDiet Meals Logo"
          width={200}
          height={200}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>

      {/* Form Start */}
      <form className="pt-4 pb-3" onSubmit={handleFormSubmit}>
        <div className="mb-2">
          <TextInput
            type="phone"
            className="form-control"
            placeholder={t("inputs.placeholderOne")}
            value={phone}
            onChange={handlePhoneChange}
            required
          />
        </div>
        <div className="mb-2">
          <TextInput
            type="email"
            className="form-control"
            placeholder={t("inputs.placeholderTwo")}
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-2 password_input_group">
          <PassInput
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder={t("inputs.placeholderThree")}
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <span className="open_eye_icon" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="mb-2 password_input_group">
          <PassInput
            type={showConfirmPassword ? "text" : "password"}
            className="form-control"
            placeholder={t("inputs.placeholderFour")}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <span
            className="open_eye_icon"
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="common_btn form-control w-50 mx-auto rounded-5 "
          >
            {t("signUpBtn")}
          </button>
        </div>
      </form>

      <Link href="/login" className="text-decoration-none">
        <strong className="signin_link text-center">{t("links.one")}</strong>
      </Link>

      <hr />
      {/* social media authentication */}
      <SocialLogin />

      {/* agreement text */}
      <div className="pt-5 pb-3">
        <p className="agreement_txt">
          {t("tramsAndCondition.one")}{" "}
          <strong>{t("tramsAndCondition.two")}</strong>{" "}
          {t("tramsAndCondition.three")}
          <strong> {t("tramsAndCondition.four")}</strong>
        </p>
      </div>
    </div>
  );
}
