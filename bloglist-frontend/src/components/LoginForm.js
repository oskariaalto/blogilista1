import PropTypes from 'prop-types'

const LoginForm = (props) => {
  return(
    <div>
      <h2>Log in to application</h2>
      <div className={props.notif}>{props.message}</div>
      <form onSubmit = {props.handleLogin}>
        <div>
          username
          <input type ="text" value= {props.username} name= "Username"
            onChange={props.handleUsernameChange}
            id = 'username' />
        </div>
        <div>
            passsword
          <input type= "password" value = {props.password} name = "Password"
            onChange={props.handlePasswordChange}
            id = 'password'/>
        </div>
        <button type='submit' id = 'login-button'>login</button>
      </form>
    </div>
  )
}

LoginForm.PropTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm