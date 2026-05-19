import { ethers } from 'ethers';
import React from 'react'
import { useReadContract } from 'wagmi';

const abi=[
    {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          }
        ],
        "name": "allowance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }

]

const CheckAllowance = () => {
    const readContract = useReadContract({
        address: '0x6ab707aca953edaefbc4fd23ba73294241490620',
        abi: abi,
        functionName: "allowance",
        args: ['0x6ab707aca953edaefbc4fd23ba73294241490620', '0x6ab707aca953edaefbc4fd23ba73294241490620'],
      });
    console.log("🚀 ~ CheckAllowance ~ readContract:", readContract.data)

  return (
    <div>CheckAllowance</div>
  )
}

export default CheckAllowance