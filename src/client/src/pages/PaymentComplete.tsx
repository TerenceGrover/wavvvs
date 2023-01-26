import React from "react";
import Logo from "../components/Logo.component";
import { buyPremium } from "../apiService/api-service";

export default function PaymentComplete() {

 const validation = window.location.href;
 const [isOK, setIsOK] = React.useState(false);

  // THIS IS UNSAFE. DO NOT USE IN PRODUCTION

  React.useEffect(() => {
    if (validation.includes("succeeded")) {
      buyPremium()
      setIsOK(true);
    }
  }, []);

  const [secs, setSecs] = React.useState(5);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setSecs((prevSecs) => prevSecs - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    if (secs === 0) {
      window.location.href = "/";
    }
  }, [secs]);

  return (
  <main className="w-screen h-screen flex flex-col justify-center items-center">
    {
      isOK ?
      <>
      <Logo />
      <h1 className="text-white mt-4">🎉 Payment Complete 🎉</h1>
      <h3 className="text-white">You will be redirected in {secs}</h3>
      </>
      :
      <> 
      <Logo />
      <h1 className="text-white mt-4">🚫 Payment Failed 🚫</h1>
      </>
    }
  </main>
  );
};