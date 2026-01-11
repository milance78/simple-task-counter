import './CurrentUser.scss'
import { signOut } from 'firebase/auth'
import { auth } from '../../../firebase/firebase-config'
import { Button } from '@mui/material'
import { useAppDispatch } from '../../../redux/store'
import { logout } from '../../../redux/features/profileSlice'


const CurrentUser = () => {
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    await signOut(auth)
    dispatch(logout())
  }

  return (
    <div className="current-user">
      <Button
        className='logout-button'
        // variant="contained"
        onClick={handleLogout}>
        Log out
      </Button>

    </div>
  )
}

export default CurrentUser
