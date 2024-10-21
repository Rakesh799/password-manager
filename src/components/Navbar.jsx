import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-purple-700 text-white flex justify-around items-center py-3'>
            <div className="logo font-bold text-lg">
            <span>&lt;</span>
            PassGuard
            <span>/&gt;</span>
            </div>
            {/* <ul>
                <li className='flex gap-4'>
                    <a href="" className='hover:font-bold'>Home</a>
                    <a href="" className='hover:font-bold'>About</a>
                    <a href="" className='hover:font-bold'>Contact</a>
                </li>
            </ul> */}
            <button className='bg-purple-800 flex gap-2 justify-center items-center text-white px-3 py-2 rounded-full hover:bg-purple-600 ring-white ring-1'>
                <img className='w-6 invert' src="/icons/git.png" alt="Github Logo" />
                <span className='font-bold'>GitHub</span>
            </button>
        </nav>
    )
}

export default Navbar
