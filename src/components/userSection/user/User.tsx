import { useEffect, useRef, useState } from 'react'
import './User.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useAppSelector } from '../../../redux/store'
import Login from '../login/Login'
import Register from '../register/Register'
import CurrentUser from '../currentUser/CurrentUser'
import LetterAvatar from '../letterAvatar/LetterAvatar'

const User = () => {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const { profileNavigation, isLoggedIn, currentUser } =
    useAppSelector(state => state.profile)

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    window.addEventListener('mousedown', handleOutsideClick)
    return () => window.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  return (
    <div className="profile" ref={wrapperRef}>
      {isLoggedIn ? (
        <LetterAvatar letter={currentUser?.email?.[0] ?? null} />
      ) : (
        <AccountCircleIcon
          className="icon"
          onClick={() => setOpen(prev => !prev)}
        />
      )}

      {open && (
        <>
          {profileNavigation === 'login' && <Login />}
          {profileNavigation === 'register' && <Register />}
          {profileNavigation === 'current' && <CurrentUser />}
        </>
      )}
    </div>
  )
}

export default User
