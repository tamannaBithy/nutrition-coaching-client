import ManagePushNotification from "@/components/Dashboard/ManagePushNotification/ManagePushNotification";
import "./pushNotification.css";

// Metadata for the page
export const metadata = {
  title: "GigaDiet Meals | Push Notification",
  description: "",
};

/**
 * Component for push notification.
 * @component
 * @returns {JSX.Element} The rendered push notification component.
 */
export default function PushNotification() {
  return (
    <div className='container-fluid notification-push-container'>
      {" "}
      <ManagePushNotification />{" "}
    </div>
  );
}
