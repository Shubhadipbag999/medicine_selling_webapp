import React from 'react'
import "./css/Contact.css"
import { toast } from 'react-toastify'


const Contact = () => {
    return (
        <div>
            <section className="contact">

                <h2 style={{ marginBottom: "-5vh", fontSize: "30px" }}>Contact Us</h2>
                {/* <p>"Contact our team at [Pharmacy Name] for information on products, medication guidance, or assistance. Your health is our priority; we're here to provide the support you need."</p> */}

                <div className="containerDiv">
                    <div className="contactinfo">
                        <div className="box">
                            <div className="icon"></div>
                            <div className="text">
                                <h3>Addres :-</h3><br />
                                <p> Champahati,Baruipur,743330</p>
                                <p>C/184, Bapuji Nagar, Jadavpur, Kol-700092</p>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon"></div>
                            <div className="text">
                                <h3>Phone :-</h3><br />
                                <p>Kushal Sanfui - 7550900489</p>
                                <p>Raju 8017999809</p>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon"></div>
                            <div className="text">
                                <h3>Email :-</h3><br />
                                <p>sanfuikushal@gamil.com</p>
                                <p>Sailaraju565@gamil.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="contactfrom">
                        <from>
                            <h2>Send message</h2>
                            <div className="inputbox">
                                <input type="text" name="" required="required" />
                                <span>Full Name</span>
                            </div>
                            <div className="inputbox">
                                <input type="text" name="" required="required" />
                                <span>Email</span>
                            </div>
                            <div className="inputbox">
                                <textarea required="required"></textarea>
                                <span>Type Your message....</span>
                            </div>
                            <div className="inputbox">
                                <input type="submit" name="" value="send" onClick={() => toast.success("Message is send to admin")} />
                            </div>
                        </from>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact