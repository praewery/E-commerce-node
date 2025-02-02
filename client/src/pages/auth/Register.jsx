import React from 'react'

const Register = () => {
  return (
    <div>
        Register
        <form>

            Email
            <input className='border'
            name='email'
            type='email'
            />
            Password
            <input className='border'
            name='password'
            type='text'
            />
            
        </form>

    </div>
  )
}

export default Register