import React from 'react'
import AppBar from './AppBarNav';

const Home = () => {
    return (
        <div>
            <AppBar/>
            <h1>Home</h1>


            <select className="form-select" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            </select>


            

        </div>
    )
}

export default Home
