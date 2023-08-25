import React from 'react'
import '../../styles/Home/Main.scss'
import person from './Logo/person.svg'

const Main = () => {
  return (
    <div className='homeMain'>
        <div className='team'>
            <div className='Logo'>
                <img src={person} alt='person'/>
            </div>
            <div className='Name'>
                <span>Real madrid</span>
                <span>Louai Sami</span>
            </div>
            <div className='NumberOfPlayers'>
                <span>12</span>
            </div>
            <div className='button'>
                <span>Edit</span>
                <span>Delete</span>
            </div>
        </div>
    </div>
  )
}

export default Main