import React from "react";

export default function Contact() {
    return (
        <>
            <div id="contact">
                <div id="imgBox">
                    <img style={{borderRadius:10}} src="https://imgs.search.brave.com/Q9794HqTg5vOAjbIEcf6byg-2ZMjzQSRaA_ke8Z1x3E/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMz/MTQ5ODEzOS9waG90/by9pdGFseS1taWxh/bi13b21hbi13aXRo/LWJyYWlkcy1qdW1w/aW5nLWFnYWluc3Qt/Ymx1ZS13YWxsLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1G/V0FSaldfeE8xTXRq/V0pQX0tnZlg2a2dS/RHR3YnZrUzViQU5O/aEJVTzFjPQ" alt="logo" />
                </div>
                <div id="inputBox">
                     <p >Name</p>
                    <input type="text" placeholder="Name" name="Name"/>
                    <p>Number</p>
                    <input type="number" name="" id="" placeholder="Number" />
                     <p>Email</p>
                    <input type="text" name="" id="" placeholder="Email" />
                   <p>Feedback</p>
                    <input type="feedback" placeholder="feedback" />
                    <button id="submit">Submit</button>
                </div>
            </div>
        </>
    )
}