import React from 'react'
import arrowBack from './icon/arrow-back.svg'
import '../../../../styles/Registration/SignUp/SectionRight/Header.scss'

const Header = ({setHome, setPersonalInfo, screen, setResidencyInfo, title, pageNumber, setChoosePicture}) => {
  const changeHandler = () => {
    if(screen == 'PersonalInfo') {
      setHome(true)
      setPersonalInfo(false)
    }else if (screen == 'ResidencyInfo'){
      setHome(false)
      setPersonalInfo(true)
      setResidencyInfo(false)
    }else if(screen == 'ChoosePicture') {
      setHome(false)
      setPersonalInfo(false)
      setResidencyInfo(true)
      setChoosePicture(false)
    }
  }
  return (
    <div className='headerSectionRight'>
        <div className='arrowBack' onClick={changeHandler}>
            <img src={arrowBack} alt='arrowBack'/>
            <span>Back</span>
        </div>
        <div className='contanierName'>
            <span>STEP {pageNumber}/03</span>
            <span>{title}</span>
        </div>
    </div>
  )
}

export default Header