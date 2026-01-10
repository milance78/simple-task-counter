import './Register.scss'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../firebase/firebase-config'
import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useAppDispatch } from '../../../redux/store'
import {
  loginSuccess,
  switchToLogin,
} from '../../../redux/features/profileSlice'

const Register = () => {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = async () => {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    dispatch(loginSuccess(res.user))
  }

  return (
    <div className="register-container">
      <h3>Register</h3>

      <TextField label="Email" onChange={e => setEmail(e.target.value)} />
      <TextField
        label="Password"
        type="password"
        onChange={e => setPassword(e.target.value)}
      />

      <Button variant="contained" onClick={submitHandler}>
        Register
      </Button>

      <p>
        Already have an account?{' '}
        <span onClick={() => dispatch(switchToLogin())}>Login</span>
      </p>
    </div>
  )
}

export default Register

