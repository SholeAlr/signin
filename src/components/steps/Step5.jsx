import DayLogo from "../../assets/Day.png";

function Step5() {
  return (
    <div className='flex flex-col shadow-md w-[100vw] h-[100vh] absolute top-0 right-0 bg-cyan-100'>
      <img src={DayLogo} className='flex mx-auto w-[60px]' />
      <div className='bg-white h-[200px] w-full absolute bottom-0 flex flex-col p-4 rounded-t-2xl justify-between'>
        <div className='flex flex-col justify-center text-right mt-2'>
          <p className='text-[13px] mt-2'>نماینده محترم : </p>
          <p className='text-[13px] mt-4'>
            درخواست ثبت نام شما در حال بررسی است، در صورت تایید اطلاعات،
            اپلیکیشن موردنظر فعال خواهد شد.
          </p>
        </div>

        <button className='bg-bluishDay h-[40px] rounded-md text-white'>
          ورود با حساب کاربری دیگر
        </button>
      </div>
    </div>
  );
}

export default Step5;
