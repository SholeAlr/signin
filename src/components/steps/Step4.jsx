import axios from "axios";
import { useState, useEffect } from "react";
import Branches from "../step4/Branches";
import Warning from "../general/Warning";
import check from "../../assets/check.svg";
import deleteIcon from "../../assets/delete.png";

function Step4({ firstAndFamily, setActiveStep, phoneNumber }) {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [provinceID, setProvinceID] = useState(0);
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [branchID, setBranchID] = useState("");
  const [phone, setPhone] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [disableCity, setDisableCity] = useState(true);
  const [agencyCode, setAgencyCode] = useState("");
  const [agencyValidated, setAgencyValidated] = useState(null);
  const [warningText, setWarningText] = useState("");
  const [isLegal, setIsLegal] = useState(false); // haghighi ya hughughi
  const [agencyType, setAgencyType] = useState("");

  //validating agency code
  function checkAgency() {
    if (agencyCode === "") {
      setWarningText("");
      return;
    }
    axios
      .post(
        "https://stage-api.sanaap.co/api/v2/app/DEY/agent/verification/signup/check_agency_code/",
        {
          agent_code: agencyCode,
        }
      )
      .then((res) => {
        if ((res.data.response = "OK")) {
          setAgencyValidated(true);
          setWarningText("");
        }
      })
      .catch((error) => {
        console.log("Error on validating agency code: ", error);
        setWarningText(error.response.data.error_details.fa_details);
        setAgencyValidated(false);
      });
  }

  //receiving provinces
  useEffect(() => {
    axios
      .get("https://stage-api.sanaap.co/base/provinces_wop/")
      .then(function (response) {
        setProvinces(response.data);
      })
      .catch(function (error) {
        console.log("Error on receiving provinces: ", error);
      });
  }, []);

  //calling cities after provinces
  function fetchCities(provinceID) {
    setLoading(true);
    setDisableCity(false);
    axios
      .get(
        `https://stage-api.sanaap.co/base/counties_wop/?province=${provinceID}`
      )
      .then((response) => {
        setCities(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log("Error on receiving cities: ", error);
      });
  }

  // checking for empty fields
  function validateForm() {
    if (
      agencyCode === "" ||
      provinceID === 0 ||
      city === "" ||
      address === "" ||
      phone === "" ||
      cityCode === "" ||
      isLegal === null
    ) {
      setWarningText("تمامی فیلدها الزامی هستند");
    } else {
      setWarningText("");
      axios
        .post(
          "https://stage-api.sanaap.co/api/v2/app/DEY/agent/verification/signup/check_agency_code/",
          {
            address: address,
            agencytype: agencyType,
            agent_code: agencyCode,
            city_code: cityCode,
            county: city,
            first_name: firstAndFamily.firstname,
            insurance_brance: branchID,
            last_name: firstAndFamily.lastname,
            phone: phone,
            phone_number: phoneNumber,
            province: provinceID,
            name: agencyName,
          }
        )
        .then((res) => {
          if (res.data.is_success === true) {
            setActiveStep(5);
          }
        })
        .catch((error) => {
          console.log("Error on posting agency data: ", error);
        });
    }
  }

  return (
    <>
      {warningText ? <Warning warningText={warningText} /> : <></>}

      <div className='flex flex-col shadow-md w-[90vw] h-full absolute top-[60px] left-0 right-0  mx-auto bg-white rounded-md p-4 justify-around'>
        <label className='p-2 flex items-center border rounded-md border-gray-300'>
          {agencyValidated ? (
            <>
              <img src={check} />
              <img
                className='w-[20px]'
                src={deleteIcon}
                onClick={() => {
                  setAgencyCode("");
                  setAgencyValidated(false);
                }}
              />
            </>
          ) : (
            <></>
          )}
          <input
            type='text'
            className='grow outline-none mr-2'
            placeholder='کد نمایندگی'
            value={agencyCode}
            onBlur={checkAgency}
            onChange={(e) => {
              setAgencyCode(e.target.value);
            }}
          />
        </label>

        <select
          className='border rounded-md p-2 border-gray-300 mt-4 outline-bluishDay text-gray-400'
          onChange={(e) => {
            fetchCities(e.target.value);
            setProvinceID(e.target.value);
          }}
        >
          <option disabled selected value={""}>
            استان
          </option>
          {provinces.map((eachProvince) => {
            return (
              <option key={eachProvince.id} value={eachProvince.id}>
                {eachProvince.name}
              </option>
            );
          })}
        </select>
        {loading ? (
          <div className='border rounded-md p-2 border-gray-300 mt-4 outline-bluishDay'>
            <span className='loading loading-spinner text-bluishDay'></span>
          </div>
        ) : (
          <select
            className={
              disableCity
                ? "border rounded-md p-2 border-gray-300 mt-4 bg-gray-300 text-gray-400"
                : "border rounded-md p-2 border-gray-300 mt-4 outline-bluishDay"
            }
            disabled={disableCity}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          >
            <option disabled selected value={""}>
              شهر
            </option>
            {cities.map((eachCity) => {
              return (
                <option key={eachCity.id} value={eachCity.name}>
                  {eachCity.name}
                </option>
              );
            })}
          </select>
        )}
        <input
          onBlur={(e) => setAddress(e.target.value)}
          className='h-[150px] border border-gray-300 mt-4 rounded-md'
        />
        <p className='bg-white w-[50px] text-center relative top-[-170px] right-[5px] text-gray-400 text-sm'>
          آدرس
        </p>

        {/* in components/step4 */}
        <Branches
          provinceID={provinceID}
          disableCity={disableCity}
          branchID={branchID}
          setBranchID={setBranchID}
        />

        <div className='flex flex-row justify-between'>
          <input
            placeholder='تلفن ثابت'
            className='border rounded-md p-2 w-[70%] border-gray-300 mt-4 outline-bluishDay'
            onBlur={(e) => setPhone(e.target.value)}
          />
          <div className='flex flex-col w-[25%] border border-gray-300 mt-4 relative rounded-md'>
            <input
              className='p-2 h-full w-full rounded-md outline-bluishDay'
              onBlur={(e) => setCityCode(e.target.value)}
            />
            <p className='bg-white text-center absolute top-[-10px] right-[5px] text-gray-400 text-sm'>
              تلفن ثابت
            </p>
          </div>
        </div>

        <div className='flex flex-row mt-2 text-sm'>
          <p className='text-gray-400 w-[30%]'>نوع نمایندگی:</p>
          <div className='w-[70%] flex flex-row justify-between'>
            <div>
              <input
                type='radio'
                name='radio-3'
                className='radio radio-secondary w-[15px] h-[15px] mx-1'
                onClick={() => {
                  setIsLegal(false);
                  setAgencyType("real");
                }}
              />
              <label htmlFor='radio-3'>حقیقی</label>
            </div>
            <div>
              <input
                type='radio'
                name='radio-3'
                className='radio radio-secondary w-[15px] h-[15px] mx-1'
                onClick={() => {
                  setIsLegal(true);
                  setAgencyType("legal");
                }}
              />
              <label htmlFor='radio-3'>حقوقی</label>
            </div>
          </div>
        </div>
        {isLegal ? (
          <input
            type='text'
            className='border rounded-md p-2 w-full border-gray-300 mt-2 outline-bluishDay'
            placeholder='نام نمایندگی'
            value={agencyCode}
            onBlur={checkAgency}
            onChange={(e) => {
              setAgencyName(e.target.value);
            }}
          />
        ) : (
          <></>
        )}

        <button
          className='bg-bluishDay h-[40px] rounded-md text-white'
          onClick={() => {
            validateForm();
            // setActiveStep(4);
          }}
        >
          ادامه
        </button>
      </div>
    </>
  );
}

export default Step4;
