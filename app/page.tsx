'use client'
import { useRef, useState } from "react";
import { UserManager } from "./config";
import { set, z, ZodError } from 'zod'
import Link from "next/link";
import { useRouter } from 'next/navigation';


export default function Home() {

  const createAccountSchema = z.object({
    email: z.string().email(),
    name: z.string().max(15)
  })

  const [errInput, setErrInput] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);

  const router = useRouter();

  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const otpRef = useRef<HTMLInputElement>(null);


  const createAcc = async (e: any) => {
    setLoader(true);
    if (emailRef.current && nameRef.current) {
      const email = emailRef.current.value;
      const name = nameRef.current.value;
      const data = { name, email }
      try {
        const validatedData = createAccountSchema.parse(data)
        if (validatedData) {
          const res = await UserManager.getInstance().createUser(data);
          // @ts-ignore
          if (res.status === "success") {
            setOtpSent(true);
          } else {
            setErrInput("exists")
            setLoader(false);
            window.alert("User already exists")
          }
        }
      } catch (error) {
        if (error instanceof ZodError) {
          setErrInput(error.errors[0].message)
        }
      }
    }
  }

  const verifyOtp = async (e: any) => {
    if (otpRef.current) {
      const otp = otpRef.current.value;
      const res = await UserManager.getInstance().verifyOtp(otp);
      if (res?.status == 'success') {
        router.push('/dashboard')
      } else {
        window.alert("Invalid OTP")
      }
    }
  }

  return (
    <>
      {!otpSent ? <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create a new account</h2>
        </div>
        <div className="mt-10 space-y-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label htmlFor="email" className={`${errInput == "Invalid email" ? "text-red-500 font-bold text-md" : "block text-sm font-medium leading-6 text-gray-900"} `}>Email address</label>
            <div className="mt-2">
              <input id="email" ref={emailRef} name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
            <div className="mt-2">
              <input id="name" ref={nameRef} name="name" type="text" autoComplete="name" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <button onClick={createAcc} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{loader ? "Loading..." : "Sign up"}</button>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have a account?
            <Link className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" href={"/signin"}> Sign in</Link>
          </p>
        </div>
      </div>
        :
        <div>
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Enter OTP send to {emailRef.current ? emailRef.current.value : null}</h2>
            </div>

            <div className="mt-10 space-y-6 sm:mx-auto sm:w-full sm:max-w-sm">
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">OTP</label>
                <div className="mt-2">
                  <input id="name" ref={otpRef} name="name" type="text" autoComplete="name" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
        </div>
      }
    </>
  )
}