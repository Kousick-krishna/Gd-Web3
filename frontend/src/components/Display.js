import React, { useState } from 'react'

function Display({contract,account}) {
  const [data,setData] = useState();
  const getData = async () =>{
    let DataArray;
    const otherAddress = document.querySelector(".address").ariaValueMax;
    try{
      if(otherAddress){
        DataArray = await contract.display(otherAddress);
      }
      else{
      DataArray = await contract.display(account);
      console.log(DataArray);
      }
    }
    catch(error){
      alert(error);
    }

    const isEmpty = Object.keys(DataArray).length===0;

    if(!isEmpty){
      const images = DataArray.map((item,i) =>{
        return(
          <a href={item} key={`a-${i}`} target="_blank" rel="noopener noreferrer">
          <img 
          key={`img-${i}`}
          src={item}
          alt='image'
          className='w-44 h-44'
          />
        </a>
      
        )
      })
        
      setData(images);
    }
    else{
      alert("No images");
    }
    
    
  }
  return (
    <>
    <div className='mt-10'>
      <div className='ml-14 flex grid-rows-2 gap-10'>{data}</div>
      <input placeholder='Enter Address'  type='text' className=' address mt-8 rounded-md p-2'/><br/>
      <button type='Submit' onClick={getData} className='mt-8 border border-black rounded p-2 hover:bg-orange-200 hover:text-amber-600'>Get data</button>
    </div>
    </>
  )
}

export default Display
