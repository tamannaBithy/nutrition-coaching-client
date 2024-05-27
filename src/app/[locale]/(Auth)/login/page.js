import SignIn from "@/components/Form/SignIn/SignIn";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";
import "./login.css";

export const metadata = {
  title: "GigaDiet Meals | LogIn",
  description: "",
};

export default function LogIn({ params }) {
  const t = useTranslations("Login");

  return (
    <div className='container d-flex justify-content-center align-items-center min-vh-100'>
      <div className='d-flex justify-content-center  login_container'>
        {/* Back Button */}
        <div className='back_btn'>
          <Link href={`/${params.locale}`}>
            <FaLongArrowAltLeft className='pe-1' />
            {t("backBtn")}
          </Link>
        </div>

        {/* LogIn form */}
        <div className='left_side_logIn '>
          <SignIn />
        </div>
        {/* Image */}
        <div className='d-lg-block d-none'>
          <Image
            src='/assets/login-image-female.webp'
            alt='login-image-female'
            width={400}
            height={610}
            className='shadow-md'
          />
        </div>
      </div>
    </div>
  );
}
