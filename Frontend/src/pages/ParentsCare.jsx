import React from 'react'
import "./css/Parentscare.css"
import Medicine from './Medicine';
const ParentsCare = () => {
    return (
        <div className='parentscarediv'>
            <div className="become-plus-member">
                <div>
                    <h2>Become a Responsible Person</h2>
                    <p>Take Care  of Your Parents</p>
                    <hr />
                </div>
                <div>
                    <p>We care about your responsibility. Please explore this new features</p>
                    <p>Write here your medicine name and timing and get reminder.</p>
                    <p>Our customer support will onpen 24x7 hour</p>
                    {/* <button>Explore Now <i className="fa-solid fa-angle-right"></i></button> */}
                </div>
                <div>
                    <img src="https://assets.pharmeasy.in/apothecary/_next/static/media/PlusFamily.22677720.png?dim=1024x0 "
                        alt="" />
                </div>
            </div>

            <div className='parentscareFormdiv'>
                <input type="text" placeholder='Write medicine name' className='inputParents' />
                <input type="text" placeholder='Write medicine timing' className='inputParents' />
                <input type="text" placeholder='Write your parents phone number' className='inputParents' />
                <button type="button" className='addBTN'>Add Medicine Reminder</button>
            </div>
        </div>
    )
}

export default ParentsCare