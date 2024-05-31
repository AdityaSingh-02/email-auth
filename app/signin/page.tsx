'use client'
import React, { useRef, useState } from 'react'
import UserManager from '../config';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignIn = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const otpRef = useRef<HTMLInputElement>(null);

    const [otpSent, setOtpSent] = useState<boolean>(false);
    const [loader, setLoader] = useState<boolean>(false);

    const router = useRouter();
    const sendOtp = async () => {
        setLoader(true);
        if (emailRef.current) {
            const email = emailRef.current.value;
            await UserManager.getInstance().sendOtp(email);
            setOtpSent(true);
        }
    }

    const verifyOtp = async () => {
        if (otpRef.current) {
            const otp = otpRef.current.value;
            const res = await UserManager.getInstance().verifyOtp(otp);
            if (res?.status === 'success') {
                router.push('/dashboard');
            } else {
                window.alert('Invalid OTP. Please try again.');
            }
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
                            <button onClick={sendOtp} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{loader?"Loading...": "Send OTP"}</button>
                        </div>
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Don&#39;t have a account?
                            <Link className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" href={"/"}> Sign up</Link>
                        </p>
                    </div>
                </div>
                :
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Enter OTP send to {emailRef.current ? emailRef.current.value : null} </h2>
                    </div>
                    <div className="mt-10 space-y-6 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">OTP</label>
                            <div className="mt-2">
                                <input id="name" ref={otpRef} name="name" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <button onClick={verifyOtp} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Verify</button>
                        </div>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Otp Valid upto 15 minutes
                        </p>
                    </div>
                </div>
            }
        </>
    )
}

export default SignIn