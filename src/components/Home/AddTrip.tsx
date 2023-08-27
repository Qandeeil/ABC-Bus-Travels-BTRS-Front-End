import React from 'react'
import '../../styles/Home/AddTrip.scss'

type Props = {
    children: any
}

const AddTrip = (props: Props) => {
  return (
    <div className='addTrips'>
        {props.children}
    </div>
  )
}

export default AddTrip