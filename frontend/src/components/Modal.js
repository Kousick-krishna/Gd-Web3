import React, { useEffect } from 'react'

function Modal({contract,setModalOpen}) {
  const sharing = async () =>{
    const address = document.querySelector(".address").value;
    await contract.allow(address);
    setModalOpen(false);
  }

  useEffect(()=>{
    const accessList = async ()=>{
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectnumber");
      const options = addressList;

      for(let i=0;i<options.length;i++){
        let opt=options[i];
        let e1 = document.createElement('option');
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  },[contract])
  return (
    <div>
      <div className='h-48 bg-white w-[500px]  rounded-lg ml-[530px]'>
        <h3 className='p-3'>Share with</h3>
        <input placeholder='Enter Address'
               className='address border border-gray-600 rounded-md text-center'
        />
        <form className='p-3'>
          <select id='selectnumber'>
            <option className='border-black'>People with Access</option>
          </select>
        </form>
        <div className='flex ml-10 p-4'>
        <button className='ml-28 bg-red-600 p-2 rounded-md' onClick={() =>setModalOpen(false)}>Cancel</button>
        <button className='ml-12 bg-green-600 p-2 rounded-md' onClick={sharing}>Share</button>
        </div>
        
      </div>
    </div>
  )
}

export default Modal
