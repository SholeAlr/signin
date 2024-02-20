import axios from "axios";

function Step1({ setActiveStep, phoneNumber, setPhoneNumber }) {
  function sendCode() {
    axios
      .post(
        "https://stage-api.sanaap.co/api/v2/app/DEY/agent/verification/signup/create_otp/",
        {
          phone_number: phoneNumber,
        }
      )
      .catch((error) => {
        console.log("Error on sending phone number: ", error);
      });
  }

  return (
    <div className='flex flex-col shadow-md w-[80vw] h-[260px] relative top-[-140px] mx-auto bg-white rounded-md p-4'>
      <div className='flex flex-col justify-center items-center'>
        <h2 className='font-bold'>شماره موبایل خود را وارد نمایید.</h2>
        <p className='text-[13px] mt-2'>کد تایید برای شما ارسال خواهد شد.</p>
      </div>

      <input
        placeholder='تلفن همراه'
        className='border rounded-md p-2 border-gray-300 mt-4'
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      <button
        className='bg-bluishDay mt-[60px] h-[40px] rounded-md text-white'
        onClick={() => {
          sendCode();
          setActiveStep(2);
        }}
      >
        ادامه
      </button>
    </div>
  );
}

export default Step1;
