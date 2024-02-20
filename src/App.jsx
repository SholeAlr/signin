import { useState } from "react";
import DayLogo from "./assets/Day.png";
import Step1 from "./components/steps/Step1";
import Step2 from "./components/steps/Step2";
import Step3 from "./components/steps/Step3";
import Step4 from "./components/steps/Step4";
import Step5 from "./components/steps/Step5";

function App() {
  const [activeStep, setActiveStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstAndFamily, setFirstAndFamily] = useState({
    firstname: "",
    lastname: "",
  });

  return (
    <main className='bg-zinc-100 w-[100vw] h-[100vh] flex flex-col overflow-scroll'>
      <div className='bg-bluishDay w-full h-1/3 rounded-b-3xl p-0'>
        <img src={DayLogo} className='flex mx-auto w-[60px]' />
      </div>
      {activeStep === 1 ? (
        <Step1
          setActiveStep={setActiveStep}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
        />
      ) : activeStep === 2 ? (
        <Step2 setActiveStep={setActiveStep} phoneNumber={phoneNumber} />
      ) : activeStep === 3 ? (
        <Step3
          setActiveStep={setActiveStep}
          firstAndFamily={firstAndFamily}
          setFirstAndFamily={setFirstAndFamily}
        />
      ) : activeStep === 4 ? (
        <Step4
          setActiveStep={setActiveStep}
          firstAndFamily={firstAndFamily}
          phoneNumber={phoneNumber}
        />
      ) : (
        <Step5 />
      )}
    </main>
  );
}

export default App;
