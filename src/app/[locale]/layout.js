import Provider from "@/Provider";
import AccessToken from "@/components/AccessToken";
import BootstrapClient from "@/components/BootstrapClient";
import "bootstrap/dist/css/bootstrap.min.css";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Poppins, Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReduxWrapper from "../../../redux/ReduxWrapper";
import ShowNotifications from "../../hooks/notifications/ShowNotifications";

// The font family for testing purposes
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-poppins--",
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-roboto--",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  manifest: "/manifest.json",
  title: "GigaDiet Meals",
  description: "Giga Diet Meals, eat like a champion",
};

export default function RootLayout({ children, params }) {
  const messages = useMessages();

  return (
    <Provider>
      <html lang={params.locale}>
        <head>
          <link rel='manifest' href={"/manifest.json"} />
        </head>
        <body
          className={`${poppins.className || ""} ${roboto.className || ""}`}>
          <ReduxWrapper>
            <ToastContainer />
            <ShowNotifications />
            <NextIntlClientProvider locale={params.locale} messages={messages}>
              {children}
            </NextIntlClientProvider>
            <AccessToken />
          </ReduxWrapper>
          <BootstrapClient />
        </body>
      </html>
    </Provider>
  );
}
