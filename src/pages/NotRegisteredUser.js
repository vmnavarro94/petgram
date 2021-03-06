import React, { useContext } from 'react'
import { Context } from '../Context'
import { UserForm } from '../components/UserForm'
import { useRegisterUser } from '../hooks/useRegisterUser'
import { useLogin } from '../hooks/useLogin'

export const NotRegisteredUser = () => {
  const { activateAuth } = useContext(Context)
  const registerCallback = ({ data }) => {
    const { signup } = data
    activateAuth(signup)
  }
  const loginCallback = ({ data }) => {
    const { login } = data
    activateAuth(login)
  }
  const [
    registerUser,
    {
      loading: registerLoading,
      error: registerError
    }
  ] = useRegisterUser(registerCallback)
  const [
    login,
    {
      loading: loginLoading,
      error: loginError
    }
  ] = useLogin(loginCallback)
  const registerErrorMsg = registerError && 'El usuario ya existe o hay algún problema.'
  const loginErrorMsg = loginError && 'El usuario o contraseña son incorrectos.'

  return (
    <>
      <UserForm onSubmit={registerUser} title='Registrarse' error={registerErrorMsg} disabled={registerLoading} />
      <UserForm onSubmit={login} title='Iniciar Sesión' error={loginErrorMsg} disabled={loginLoading} />
    </>
  )
}
