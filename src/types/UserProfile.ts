export interface UserProfile {
  uid: string
  username: string
  email: string
  role: 'user' | 'admin'
  countersCount: number
  createdAt: any
}