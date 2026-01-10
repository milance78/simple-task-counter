import './Login.scss'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../firebase/firebase-config'
import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useAppDispatch } from '../../../redux/store'
import {
  loginSuccess,
  switchToRegister,
} from '../../../redux/features/profileSlice'


const Login = () => {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = async () => {
    const res = await signInWithEmailAndPassword(auth, email, password)
    dispatch(loginSuccess(res.user))
  }

  return (
    <div className="login-container">
      <h3>Login</h3>

      <TextField label="Email" onChange={e => setEmail(e.target.value)} />
      <TextField
        label="Password"
        type="password"
        onChange={e => setPassword(e.target.value)}
      />

      <Button variant="contained" onClick={submitHandler}>
        Login
      </Button>

      <p>
        No account?{' '}
        <span onClick={() => dispatch(switchToRegister())}>Register</span>
      </p>
    </div>
  )
}

export default Login
