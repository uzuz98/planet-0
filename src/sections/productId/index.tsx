'use client'
import React, { useState } from "react"
import { Product } from "@/types"
import Image from "next/image"
import { ClientRouting } from "@/constants/routing"

export const Wrapper = (props: {
  product: Product
}) => {
  const { product } = props
  const [value, setValue] = useState('')

  const onChangeInput = (e: any) => {
    setValue(e.target.value)
  }

  return (
    <div className="pt-24">
      <p className="font-bold text-base mb-4">Product Detail</p>
      <div className="flex flex-col gap-y-4 md:flex-row justify-around w-full gap-x-4">
        <div className="leftItem flex flex-col flex-2 gap-y-2">
          {/* <div className="w-full bg-[#D0D0D0] h-[1px] mb-2"></div> */}
          <div className="bg-[#D9F4D53D] p-4 rounded-2xl">
            <div className="grid bg-white grid-cols-2 gap-x-4 mb-4 p-4 rounded-2xl">
              <div className="">
                <Image
                  src={`${ClientRouting.imageURL}/bg.png`}
                  alt="logo"
                  width={324}
                  height={174}
                />
              </div>
              <div>
                <p className="text-bold text-xl">{product.name}</p>
                <p className="text-[#333333] opacity-[80%]">Total {product.symbol} available: xxx {product.symbol}</p>
              </div>
            </div>
            <div className="bg-[#EEF7FF80] text-[#597E52] rounded-2xl p-4">
              <p className="mb-8">Estimate Reward</p>
              <p className="mb-2">Profit sharing Estimate: 10%</p>
              <p>Carbon Credit earn value estimate: 100 $FOR </p>
            </div>
          </div>
          <div className="bg-[#D9F4D53D] p-4 rounded-2xl text-[#333333]">
            <p className="mb-2 text-xl font-bold">{product.name}</p>
            <p>{product.description}</p>
          </div>
        </div>
        <div className="flex-1 md:w-[300px]">
          <div className="bg-[#D9F4D53D] p-4 pb-8 rounded-2xl">
            <p className="text-[#333333] mb-1 font-bold text-xl opacity-[80%]">Amount</p>
            <div>
            <input onChange={onChangeInput} className="bg-white outline-none rounded-xl p-2 w-full focus-visible:border-0 focus-visible:border-none"/>
            </div>
            <div className="mt-2 flex flex-end">
              <button className="bg-black ml-auto rounded-full py-1 px-3 text-white text-base font-bold">
                BUY
              </button>
            </div>
          </div>
          <div className="bg-[#D9F4D53D] p-4 pb-8 mt-2 rounded-2xl">
            <p className="font-bold text-[#333333]">Receive</p>
            <div className="mt-2 grid grid-cols-2 text-[#333333]">
              <p className="opacity-[50%]">Total:</p>
              <p className="text-right">{value || 0} ${product.symbol}</p>
              <p className="mt-2 opacity-[50%]">Services fee:</p>
              <p className="text-right">7%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}