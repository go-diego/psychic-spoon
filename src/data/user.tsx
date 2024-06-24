import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

export type User = {
  id: string | null
  name: string | null
}

interface UserContextType {
  user: User
  isLoggedIn: boolean
  login: (userName: string) => void
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({ id: null, name: null })
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId')
    if (storedUserId) {
      const userName = convertIdToUserName(storedUserId)
      setUser({ id: storedUserId, name: userName })
      setIsLoggedIn(true)
    }
  }, [])

  const login = (userName: string) => {
    const userId = convertUserNameToId(userName)
    localStorage.setItem('userId', userId)
    setUser({ id: userId, name: userName })
    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem('userId')
    setUser({ id: null, name: null })
    setIsLoggedIn(false)
  }

  const convertUserNameToId = (userName: string) => {
    return userName.toLowerCase().replace(/ /g, '_')
  }

  const convertIdToUserName = (userId: string) => {
    return userId
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export { UserProvider, useUser }
