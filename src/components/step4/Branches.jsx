import { useState } from "react";
import axios from "axios";
import search from "../../assets/search.png";

function Branches({ provinceID, disableCity, branchID, setBranchID }) {
  const [branches, setBranches] = useState([]);

  //searching for insurance branch in that province
  function searchBranch() {
    axios
      .get(
        `https://stage-api.sanaap.co/api/v2/app/selection_item/insurance_branch/wop_list/?name=${branchID}&insurance=DEY&province=${provinceID}`
      )
      .then((response) => {
        setBranches(response.data.response);
      })
      .catch(function (error) {
        console.log("Error on receiving branches: ", error);
      });
  }

  //handling branch modal
  function handleBranchSelection(branchName) {
    setBranchID(branchName);
    document.getElementById("my_modal_7").checked = false;
  }

  return (
    <label
      className={
        disableCity
          ? "flex border rounded-md p-2 border-gray-300  bg-gray-300 text-gray-400"
          : "flex border rounded-md p-2 border-gray-300  outline-bluishDay"
      }
    >
      <input
        type='text'
        className='grow text-gray-400 bg-transparent outline-none'
        placeholder='شعبه بیمه'
        onChange={(e) => setBranchID(e.target.value)}
        value={branchID}
        disabled={disableCity}
      />

      <label htmlFor='my_modal_7'>
        <img src={search} className='w-[25px]' onClick={() => searchBranch()} />
      </label>
      <input type='checkbox' id='my_modal_7' className='modal-toggle' />
      <div className='modal' role='dialog'>
        <div className='modal-box'>
          <h3 className='text-lg font-bold mb-4'>
            شعبه مورد نظر را انتخاب کنید
          </h3>
          {branches > 0 ? (
            <p>در حال بارگزاری</p>
          ) : (
            <ul>
              {branches.map((eachBranch) => {
                return (
                  <div className='form-control' key={eachBranch.id}>
                    <label
                      className='cursor-pointer label'
                      onClick={() => handleBranchSelection(eachBranch.name)}
                    >
                      <span className='label-text'>{eachBranch.name}</span>
                      <input
                        type='checkbox'
                        className='checkbox checkbox-accent'
                      />
                    </label>
                  </div>
                );
              })}
            </ul>
          )}
        </div>
        <label className='modal-backdrop' htmlFor='my_modal_7'>
          Close
        </label>
      </div>
    </label>
  );
}

export default Branches;
