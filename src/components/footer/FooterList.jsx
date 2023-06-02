import React from 'react'

function FooterList({title,linkArr}) {
  return (
        <div className="md:my-0 my-5 mx-5">
            <h5 className="pb-3 font-semibold">{title} </h5>
            <ul className="list-style pl-0 text-[17px]">
                {
                    linkArr.map((i,idx)=>{
                        return <li className="pb-3 cursor-pointer hover:text-black" key={idx}>{i}</li>
                    })
                }
            </ul>
        </div> 
  )
}

export default FooterList