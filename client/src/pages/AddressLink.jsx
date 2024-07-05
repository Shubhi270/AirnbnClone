import React from 'react'

const AddressLink = ({children, className=null}) => {
  
  if(!className){
    className = "gap-1 my-3 block";
  }

  className+='flex gap-1 font-semibold underline';
  
  return (
    <>
      <a
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        href={"https://maps.google.com/?q=" + children}
      >
        {children}
      </a>
    </>
  );
}

export default AddressLink