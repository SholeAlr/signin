import { useState, useEffect } from "react";
import axios from "axios";
import edit from "../../assets/edit.png";

function Step2({ setActiveStep, phoneNumber }) {
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    if (!timeLeft) return;

    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  //retry to receive code
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

  //validate the code
  function validateCode() {
    axios
      .post(
        "https://stage-api.sanaap.co/api/v2/app/DEY/agent/verification/signup/validate_otp/",
        {
          code: 55555,
          phone_number: phoneNumber,
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.response == "OK") {
          setActiveStep(3);
        } else {
          window.alert(response.error_details.fa_details);
        }
      })
      .catch((error) => {
        console.log("Error on validating the code: ", error);
      });
  }

  return (
    <div className='flex flex-col shadow-md w-[80vw] h-[260px] relative top-[-140px] mx-auto bg-white rounded-md p-4'>
      <div className='flex flex-col justify-center items-center'>
        <h2 className='font-bold'>کد تایید را وارد نمایید.</h2>
        <div className='text-sm mt-2 flex flex-row'>
          <div
            className='bg-bluishDay w-[24px] aspect-square rounded-full p-1 mx-1'
            onClick={() => setActiveStep(1)}
          >
            <img src={edit} className='rounded-full w-[20px]' />
          </div>

          <p>{phoneNumber}</p>
        </div>
      </div>

      <div className='flex flex-row justify-around'>
        <input className='border rounded-md p-2 border-gray-300 mt-4 w-[40px] text-center outline-bluishDay' />
        <input className='border rounded-md p-2 border-gray-300 mt-4 w-[40px] text-center outline-bluishDay' />
        <input className='border rounded-md p-2 border-gray-300 mt-4 w-[40px] text-center outline-bluishDay' />
        <input className='border rounded-md p-2 border-gray-300 mt-4 w-[40px] text-center outline-bluishDay' />
        <input className='border rounded-md p-2 border-gray-300 mt-4 w-[40px] text-center outline-bluishDay' />
      </div>
      {timeLeft ? (
        <p className='mx-auto mt-8 text-gray-300 text-sm'>
          ارسال مجدد کد:{`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}{" "}
        </p>
      ) : (
        <p
          className='text-bluishDay mx-auto mt-8 text-sm underline'
          onClick={() => {
            sendCode();
            setTimeLeft(120);
          }}
        >
          ارسال مجدد کد
        </p>
      )}

      <button
        className='bg-bluishDay h-[40px] rounded-md text-white absolute top-[200px] w-[90%] box-border'
        onClick={() => validateCode()}
      >
        ادامه
      </button>
    </div>
  );
}

export default Step2;
