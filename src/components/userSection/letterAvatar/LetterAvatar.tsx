import './LetterAvatar.scss'

interface Props {
  letter: string | null
}

const LetterAvatar = ({ letter }: Props) => {
  return <div className="letter-avatar">{letter}</div>
}

export default LetterAvatar
