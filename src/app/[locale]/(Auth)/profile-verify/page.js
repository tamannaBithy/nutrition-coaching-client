import VerifyProfile from "@/components/Form/VerifyProfile/VerifyProfile";
import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";
import "./profileVerify.css";

export const metadata = {
  title: "GigaDiet Meals | Profile Verify",
  description: "",
};

export default function ProfileVerify() {
  return (
    <div className='container d-flex justify-content-center align-items-center min-vh-100'>
      <div className='verify_profile_container w-75 mx-auto py-4 px-5 rounded-3'>
        <div className='profile-verify_back_btn'>
          <Link href='/dashboard'>
            <FaLongArrowAltLeft className='pe-1' />
            Back
          </Link>
        </div>

        <div className='pt-4 text-center'>
          <h1 className='display-6 profile_verify_title text-center'>
            Verify Profile
          </h1>

          <VerifyProfile />
        </div>
      </div>
    </div>
  );
}
