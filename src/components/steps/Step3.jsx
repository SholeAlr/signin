function Step3({ setActiveStep, firstAndFamily, setFirstAndFamily }) {
  function checkNames() {
    if (firstAndFamily.firstname == "" || firstAndFamily.lastname == "") {
      window.alert("لطفا نام و نام خانوادگی خود را وارد کنید");
    }
  }

  return (
    <div className='flex flex-col shadow-md w-[80vw] h-[330px] relative top-[-140px] mx-auto bg-white rounded-md p-4 justify-around'>
      <input
        placeholder='نام '
        className='border rounded-md p-2 border-gray-300 mt-4'
        onChange={(e) =>
          setFirstAndFamily((prevState) => ({
            ...prevState,
            firstname: e.target.value,
          }))
        }
      />
      <input
        placeholder='نام خانوادگی'
        className='border rounded-md p-2 border-gray-300 '
        onChange={(e) =>
          setFirstAndFamily((prevState) => ({
            ...prevState,
            lastname: e.target.value,
          }))
        }
      />
      <button
        className='bg-bluishDay h-[40px] rounded-md text-white'
        onClick={() => {
          checkNames();
          setActiveStep(4);
        }}
      >
        ادامه
      </button>
    </div>
  );
}

export default Step3;
