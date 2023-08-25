import React from 'react'
import searchLogo from './Logo/search.svg'
import addLogo from './Logo/add-circle-line.svg'
import '../../styles/Home/Header.scss'

const Header = () => {
  return (
    <div className='homeHeader'>
        <div className='title'>
            <h1>Add Team</h1>
        </div>
        <div className='addTeamContainer'>
            <div className='containerLogoSearch'>
                <img src={searchLogo} alt='searchLogo'/>
            </div>
            <div className='containerAddLogo'>
                <img src={addLogo} alt='addLogo'/>
                <span>New Team</span>
            </div>
        </div>
    </div>
  )
}

export default Header