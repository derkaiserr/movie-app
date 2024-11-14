import React from 'react'

function Header() {
  return (
    <div className=' lg:flex grid px-20 pt-5 fixed bg-transparent z-30 w-full'>
       
    <nav className='flex gap-8 flex-[2]'>
        <p>Movies</p>
        <p>Series</p>
        <p>Documentaries</p>
    </nav>
        <div className='flex flex-1 gap-2'>
            {/* <p></p> */}
            <button>Sign up</button>
            <button>Log in</button>
        </div>
    </div>
  )
}

export default Header