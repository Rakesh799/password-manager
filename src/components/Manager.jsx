import React, { useRef, useState, useEffect } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {

    const [form, setForm] = useState({
        site: "",
        username: "",
        password: ""
    })
    const ref = useRef()
    const passwordRef = useRef()
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")

        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])



    const showPassword = () => {
        passwordRef.current.type = "text";
        if (ref.current.src.includes("icons/eyeclosed.png")) {
            ref.current.src = "icons/eyeopen.png"
            passwordRef.current.type = "password";
        }
        else {
            ref.current.src = "icons/eyeclosed.png"
            passwordRef.current.type = "text";
        }

    }

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, { ...form, id: uuidv4() }]);
            setForm({ site: "", username: "", password: "" })

            toast('Password Saved !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else{
            toast(`Can't save less than three characters !`)
        }
    }

    const deletePassword = (id) => {

        let c = confirm("do you really want to delete ?")
        if (c) {
            console.log("deleting password with id: ", id);
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        }

        toast('Password Deleted.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

    }

    const editPassword = (id) => {
        console.log("editing password with id: ", id);
        setForm(passwordArray.filter(item => item.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {

        toast('Copied to Clipboard !!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

        // alert("copied to clipboard " + text)
        navigator.clipboard.writeText(text)
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            {/* Same as */}
            <ToastContainer />
            

            <div className="p-4 md:mycontainer min-h-[83.3vh]">
                <div>
                    <h1 className="logo font-bold text-2xl text-center">
                        <span>&lt;</span>
                        PassGuard
                        <span>/&gt;</span>
                    </h1>
                    <p className='text-center text-purple-800 text-lg'>Your own password manager</p>
                </div>

                <div className='flex flex-col gap-3 justify-center items-center'>
                    <input value={form.site} onChange={handleChange} name='site' placeholder='Enter website URL' type="text" id='site' className='w-full border border-purple-900 rounded-xl p-1 pl-2' />
                    <div className='flex-col md:flex justify-between gap-3 w-full'>
                        <input value={form.username} name='username' onChange={handleChange} placeholder='Enter Username' type="text" id='username' className='w-full border border-purple-900 rounded-xl p-1 pl-2' />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} name='password' onChange={handleChange} placeholder='Enter Password' type="password" id='password' className='w-full border border-purple-900 rounded-xl p-1 pl-2' />
                            <span className="absolute right-2 top-1.5 cursor-pointer" onClick={showPassword}>
                                <img ref={ref} width={20} src="icons/eyeopen.png" alt="eyeopen" />
                            </span>
                        </div>
                    </div>


                    <button onClick={savePassword} className='flex justify-center items-center gap-1 w-fit bg-purple-700 border border-purple-900 rounded-xl p-1 pl-2'>Save Password
                        <img className='w-6' src="icons/add.png" alt="" />
                    </button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-xl py-4 pl-2'>YOUR PASSWORDS</h2>
                    {passwordArray.length === 0 && <div>No Passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-xl overflow-hidden mb-4">
                        <thead className=' bg-purple-900 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-purple-200'>

                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex justify-center items-center gap-2'>
                                            <a href='item.site' target='_blank'>{item.site}</a>
                                            <img className='w-4 cursor-pointer' src="icons/copy.png" alt="copy icon" onClick={() => { copyText(item.site) }} />
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex justify-center items-center gap-2'>
                                            {item.username}
                                            <img className='w-4 cursor-pointer' src="icons/copy.png" alt="copy icon" onClick={() => { copyText(item.username) }} />
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex justify-center items-center gap-2'>
                                            {item.password}
                                            <img className='w-4 cursor-pointer' src="icons/copy.png" alt="copy icon" onClick={() => { copyText(item.password) }} />
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className="flex justify-center items-center gap-4">
                                            <span className='cursor-pointer' onClick={() => { editPassword(item.id) }}>
                                                <img className='w-4' src="icons/edit.png" alt="edit icon" />
                                            </span>
                                            <span className='cursor-pointer' onClick={() => { deletePassword(item.id) }}>
                                                <img className='w-4' src="icons/delete.png" alt="delete icon" />
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>}

                </div>
            </div>
        </>
    )
}

export default Manager
