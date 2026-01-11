import { useEffect, useRef } from 'react'
import './User.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import Login from '../login/Login'
import Register from '../register/Register'
import CurrentUser from '../currentUser/CurrentUser'
import { setFormVisibility, toggleFormVisibility } from '../../../redux/features/profileSlice'

const User = () => {
  const dispatch = useAppDispatch();
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const { profileNavigation, isFormVisible, isLoggedIn, currentUser } =
    useAppSelector(state => state.profile)

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        dispatch(setFormVisibility(false));
      }
    }
    window.addEventListener('mousedown', handleOutsideClick)
    return () => window.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  return (
    <div className="profile" ref={wrapperRef}>
      {/* profile icon  */}
      {isLoggedIn
        ? <div className='letter-avatar'
          onClick={() => dispatch(toggleFormVisibility())}>
          {currentUser?.email?.[0] ?? null}
        </div>
        : <AccountCircleIcon
          className="icon"
          onClick={() => dispatch(toggleFormVisibility())}
        />
      }
      {/* form pop out window */}
      {isFormVisible &&
        <>
          {profileNavigation === 'login' ? <Login />
            : profileNavigation === 'register' ? <Register />
              : profileNavigation === 'current' && <CurrentUser />}
        </>}
    </div>
  )
}

export default User
