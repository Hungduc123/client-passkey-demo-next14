import React from 'react'
import { useWriteContract } from 'sdk-passkeyring';

const Transaction = () => {
    const {writeContract} = useWriteContract()
  return (
    <div
    onClick={()=>{
        writeContract()
    }}
    >Transaction</div>
  )
}

export default Transaction