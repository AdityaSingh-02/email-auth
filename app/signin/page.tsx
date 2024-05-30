'use client'
import React, { useRef, useState } from 'react'
import UserManager from '../config';
import Link from 'next/link';

const page = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const otpRef = useRef<HTMLInputElement>(null);

    const [otpSent, setOtpSent] = useState<boolean>(false);

    const sendOtp = async (e: any) => {
        e.preventDefault();
        if (emailRef.current) {
            const email = emailRef.current.value;
            setOtpSent(true);
            await UserManager.getInstance().sendOtp(email);
        }
    }

    const verifyOtp = async (e: any) => {
        e.preventDefault();
        if (otpRef.current) {
            const otp = otpRef.current.value;
            const res = await UserManager.getInstance().verifyOtp(otp);
            console.log(res);
        }
    }

    return (
        <>
            {!otpSent ?
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign In </h2>
                    </div>
                    <div className="mt-10 space-y-6 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div>
                            <label htmlFor="email" className={`"block text-sm font-medium leading-6 text-gray-900"} `}>Email address</label>
                            <div className="mt-2">
                                <input id="email" ref={emailRef} name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <button onClick={sendOtp} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Send OTP</button>
                        </div>
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Don't have a account?
                            <Link className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" href={"/"}> Sign up</Link>
                        </p>
                    </div>
                </div>
                :
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Enter OTP </h2>
                    </div>
                    <div className="mt-10 sm:mx-auto space-y-6 sm:w-full sm:max-w-sm">
                        <div>
                            <label htmlFor="otp" className={`"block text-sm font-medium leading-6 text-gray-900"} `}>OTP</label>
                            <div className="mt-2">
                                <input id="otp" ref={otpRef} name="otp" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <button onClick={verifyOtp} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Verify OTP</button>
                        </div>
                        <div>
                            <button onClick={sendOtp} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Send OTP Again</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default page