import React from 'react'
import './SideMenu.scss'
import NewTask from '../newTask/NewTask';
import User from '../userSection/User';
// import pcd from '../../assets/img/pcd.jpg'

const SideMenu = () => {



    return (
        <section className='side-menu'>
            {/* <img src={pcd} alt="pcd" /> */}
            <User />

            <NewTask />

        </section>
    )
}

export default SideMenu