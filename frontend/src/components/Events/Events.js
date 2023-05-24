import React, { useEffect, useState } from 'react'
import styles from '../../style/styles';
import EventCard from "./EventCard.js"
import { useSelector } from 'react-redux';

const Events=()=> {
  const {allEvents} = useSelector((state)=>state.events)
  const [data,setData]= useState()
  useEffect(()=>{
    // const sortedData = allEvents&& allEvents.reduce((a,b)=>a.sold_out-b.sold_out)
    // setData(sortedData)
  },[])
  // console.log()
    return (
        <div>
          <div className={`${styles.section}`}>
            <div className={`${styles.heading}`}>
              <h1 className="mt-5">Popular Events</h1>
            </div>
            <div className='w-full grid'>
                <EventCard active={true} data={allEvents && allEvents[0]}/>
            </div>
          </div>
        </div>
      );
}

export default Events