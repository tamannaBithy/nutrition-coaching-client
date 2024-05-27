"use client";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";

const SocialLogin = () => {
  const t = useTranslations("Login");

  const { locale } = useParams();

  const handleSignIn = async (provider) => {
    try {
      const url = new URL(window.location.href);

      /* Redirect to the previous page */
      const callbackUrl =
        url.href === `${url.origin}${url.pathname}`
          ? `${url.origin}/${locale}`
          : url.searchParams.get("callbackUrl");

      await signIn(provider, {
        callbackUrl,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='d-flex flex-column '>
      {/* Google button */}
      <button
        className='my-2 w-75 mx-auto d-flex justify-content-evenly align-items-center p-2 border-0 outline-none rounded-2 google_btn'
        onClick={() => handleSignIn("google")}>
        <Image
          src='/assets/google_img.svg'
          alt='google'
          width={20}
          height={20}
        />
        {t("socialBtn.one")}
      </button>
      {/* Facebook button */}
      <button
        className='my-2 w-75 mx-auto d-flex justify-content-evenly align-items-center p-2 border-0 outline-none rounded-2 facebook_btn'
        onClick={() => handleSignIn("facebook")}>
        <Image
          src='/assets/facebook_img.svg'
          alt='facebook'
          width={20}
          height={20}
        />
        {t("socialBtn.two")}
      </button>
      {/* Apple button */}
      {/* <button className='my-2 w-75 mx-auto d-flex justify-content-evenly align-items-center p-2 border-0 outline-none rounded-2 apple_btn'>
          <Image
            src='/assets/apple_img.svg'
            alt='apple'
            width={20}
            height={20}
          />
          Continue with Apple
        </button> */}
    </div>
  );
};

export default SocialLogin;
