import PropTypes from 'prop-types'
import { useState, useImperativeHandle, forwardRef } from 'react'


const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hide = { display : visible ? 'none' : '' }
  const show = { display : visible ? '' : 'none' }

  const visibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => { return{ visibility } })

  return(
    <div>
      <div style={hide}>
        <button onClick={visibility}>{props.buttonLable}</button>
      </div>
      <div style={show}>
        {props.children}
        <button onClick={visibility}>cancel</button>
      </div>
    </div>
  )

})

Togglable.propTypes ={
  buttonLable: PropTypes.string.isRequired
}

Togglable.displayName = 'Toggable'

export default Togglable
