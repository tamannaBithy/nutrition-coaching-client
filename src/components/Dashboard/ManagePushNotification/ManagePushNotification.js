"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import AddNotificationForm from "./AddNotificationForm/AddNotificationForm";
export default function ManagePushNotification() {
  const t = useTranslations("Dashboard");
  const { locale } = useParams();

  return (
    <>
      {/* Title section for push notification */}
      <div className='push_notification_title'>
        <h2>{t("ManageNotification.pageTitle")}</h2>
      </div>

      {/* Main Content */}
      <div className='py-3'>
        <AddNotificationForm />
      </div>
    </>
  );
}
