import React from 'react'
import './CustomButton.css'

const CustomButton = ({ secondary, text, ...otherProps }) => {
  return (
    <button {...otherProps} type='submit' className={!secondary ? 'custom-button' : 'custom-button__secondary'}>
      {text}
    </button>
  )
}

export default CustomButton
