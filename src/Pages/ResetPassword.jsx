import React from 'react'
import Input from '../components/UI/Input'
import Button from '../components/UI/Button'

function ResetPassword() {
  return (
    <div className="w-2/3">
      <div>
        <h1 className="text-sv-xxl font-bold">Reset Password</h1>
        <p className="text-sv-grey text-lg">Enter a new password.</p>
      </div>
      <div className="mt-10 flex flex-col gap-5">
        <Input label="Enter Password" type="password" />
        <Input label="Confirm Password" type="password" />
      </div>
      <div className="mt-10">
        <Button text="Continue" />
      </div>
    </div>
  )
}

export default ResetPassword