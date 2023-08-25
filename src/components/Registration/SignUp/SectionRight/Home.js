import React from 'react'
import '../../../../styles/Registration/SignUp/SectionRight/Home.scss'
import polygon1 from './icon/Polygon1.svg'
import polygon2 from './icon/Polygon2.svg'
import user from './icon/user.svg'
import briefcase from './icon/briefcase.svg'
import { NavLink } from 'react-router-dom'

const SectionRight = ({setHome, setPersonalInfo, setCaseSignup}) => {
    const clickHandler = (e) => {
        setHome(false)
        setPersonalInfo(true)
        setCaseSignup(e)
    }
  return (
    <div className='homeSectionRight'>
        <div className='headerSignIn'>
            <span>Already have an account? <NavLink to={'/Signin'}>Sign In</NavLink></span>
        </div>
        <div className='selectForm'>
            <div className='header'>
                <h1>Join Us!</h1>
                <span>To begin this journey, tell us what type of account you’d be opening.</span>
            </div>
            <div className='box' onClick={() => clickHandler('user')}>
                <div className='icon'>
                    <img src={polygon1}/>
                    <img src={user}/>
                </div>
                <div className='contentBox'>
                    <h1>Individual</h1>
                    <p>Personal account to manage all you activities.</p>
                </div>
                <div className='backgroundIcon'></div>
            </div>
            <div className='box' onClick={() => clickHandler('admin')}>
                <div className='icon'>
                    <img src={polygon2}/>
                    <img src={briefcase}/>
                </div>
                <div className='contentBox'>
                    <h1>Business</h1>
                    <p>Own or belong to a company, this is for you.</p>
                </div>
                <div className='backgroundIcon'></div>
            </div>
        </div>
    </div>
  )
}

export default SectionRight