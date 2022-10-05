import { TextInput, Label, Button } from 'flowbite-react'
import React, { useState } from 'react'
import { HiKey } from "react-icons/hi";
import { VscCheckAll } from "react-icons/vsc";
import { AiOutlineLogin } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { auth, setUpRecaptcha, userRegister } from '../../firebase';
import toast, { Toaster } from 'react-hot-toast';

function Register() {

    const navigate = useNavigate()

    console.log(auth.currentUser);

    const [value, setValue] = useState("")
    const [otp, setOtp] = useState("")
    const [flag, setFlag] = useState(false)
    const [confirmObj, setConfirmObj] = useState("")

    const getOTP = async (e) => {
        e.preventDefault()
        if (value === "" || value === undefined) {
            toast.error("Please fill out this field !")
        }
        else {
            try {
                const res = await setUpRecaptcha(value);
                setConfirmObj(res)
                setFlag(true)
            } catch (error) {
                toast.error(error.message)
            }
        }

    }

    const verifyOTP = async (e) => {
        e.preventDefault()
        if (otp === "" || otp === null) {
            toast.error("Please fill this field !")
        }
        try {
            const res = await confirmObj.confirm(otp);
            if (res) {
                await userRegister(value)
                navigate('/', {
                    replace: true
                })
            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    return (
        <div style={{ backgroundColor: "#191a20" }} className="w-full flex flex-row items-center p-4 justify-center h-screen">
            <div style={{ backgroundColor: "#323237" }} className='relative xs:w-full xs:justify-center md:w-4/6 lg:w-3/4 xl:w-1/3 xs:h-full md:h-5/6 flex flex-col rounded-2xl'>
                <Link to="/login">
                    <AiOutlineLogin className="absolute m-4 h-6 w-6 top-1 left-0 text-white hover:bg-white hover:text-black hover:rounded-2xl hover:cursor-pointer" />
                </Link>
                <div className='p-8 mt-10'>
                    <div className='w-full flex xs:flex-col items-center justify-center'>
                        <span className="text-4xl shadow-2xl shadow-stone-900 before:block before:absolute xs:before:-inset-1 sm:before:-inset-3 before:-skew-y-3 before:bg-zinc-600 relative inline-block">
                            <span className="xs:text-base sm:text-3xl md:text-4xl relative text-white tracking-wide">REGISTER</span>
                        </span>
                        <div className='w-6/12 mt-10 flex flex-col items-center'>
                            <img className='w-2/4 rounded-full shadow-xl shadow-neutral-900' src="https://pbs.twimg.com/profile_images/1476294398782672898/eBuhTSsJ_400x400.jpg" alt="landing" />
                            <label className="mt-5 block">
                                <input type="file" className="block w-full text-xs text-zinc-400 rounded-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white file:text-white hover:file:bg-violet-100" />
                            </label>
                        </div>
                    </div>

                    <form onSubmit={getOTP} className="flex flex-col w-11/12 m-auto mt-6 gap-4" style={{ display: !flag ? "block" : "none" }}>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    style={{ color: "white" }}
                                    htmlFor="email1"
                                    value="Your Phone Number"
                                />
                            </div>
                            <div className='bg-white rounded-xl py-1 px-4'>
                                <PhoneInput
                                    international
                                    defaultCountry="TR"
                                    value={value}
                                    onChange={setValue} />
                            </div>
                        </div>
                        <div className='flex justify-center items-center mt-6'>
                            <div id='recaptcha-container'></div>
                        </div>

                        <div className='flex justify-center items-center my-5'>
                            <Button color="light" type="submit">
                                <VscCheckAll className="mr-2 h-5 w-5" />
                                Register
                            </Button>
                        </div>

                    </form>

                    <form onSubmit={verifyOTP} style={{ display: flag ? "block" : "none" }}>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    style={{ color: "white" }}
                                    htmlFor="password1"
                                    value="Your OTP"
                                />
                            </div>
                            <TextInput
                                id="password1"
                                required={true}
                                icon={HiKey}
                                placeholder="Enter OTP"
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>

                        <div className='flex justify-center items-center my-5'>
                            <Button color="light" type="submit">
                                <VscCheckAll className="mr-2 h-5 w-5" />
                                Confirm
                            </Button>
                        </div>
                    </form>
                </div>

            </div>
            <Toaster position="top-right" />

        </div >
    )
}

export default Register