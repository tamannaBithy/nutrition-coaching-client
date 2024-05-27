import SignUp from "@/components/Form/SignUp/SignUp";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";
import "./register.css";

export const metadata = {
  title: "GigaDiet Meals | Register",
  description: "",
};

export default function Register() {
  const t = useTranslations("Register");

  return (
    <div className='container d-flex justify-content-center align-items-center min-vh-100'>
      <div className='d-flex justify-content-center  register_container'>
        {/* Back Button */}
        <div className='back_btn'>
          <Link href='/login'>
            <FaLongArrowAltLeft className='pe-1' />
            {t("backBtn")}
          </Link>
        </div>
        {/* register form */}
        <div className='left_side_register '>
          <SignUp />
        </div>
        {/* Image */}
        <div className='d-lg-block d-none'>
          <Image
            src='/assets/login-image-female.webp'
            alt='login-image-female'
            width={400}
            height={672}
            className='shadow-md'
          />
        </div>
      </div>
    </div>
  );
}
