import {Outlet, Link} from 'react-router-dom'

export default function Root({}){
    return (
        <>
            <nav>
                <li><Link to="/">home</Link></li>
                <li><Link to='/signup'>signup</Link></li>
            </nav>
            <Outlet/>
        </>
    )
}