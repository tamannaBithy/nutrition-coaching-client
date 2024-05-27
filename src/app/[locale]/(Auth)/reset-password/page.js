import ResetPasswordForm from "@/components/Form/ResetPasswordForm/ResetPasswordForm";
import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";

import { useTranslations } from "next-intl";

import "./resetPassword.css";

export const metadata = {
  title: "GigaDiet Meals | Reset Password",
  description: "",
};

export default function ResetPassword() {
  const t = useTranslations("ResetPassword");

  return (
    <div className='container sm_p_none d-flex justify-content-center align-items-center min-vh-100'>
      <div className='reset_pass_container w-75 mx-auto py-4 px-5 rounded-3'>
        <div className='reset_back_btn'>
          <Link href='/login'>
            <FaLongArrowAltLeft className='pe-1' />
            {t("backBtn")}
          </Link>
        </div>

        <div className='pt-4 text-center'>
          <h1 className='display-6 reset_pwd_title text-center'>
            {t("title")}
          </h1>

          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
}
