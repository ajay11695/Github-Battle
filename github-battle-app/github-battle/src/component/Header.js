import {useState} from 'react'
import { NavLink } from 'react-router-dom'

function Header(){
    let [isLight,setIsLight]=useState(true)  
   
     function toggle () {
        setIsLight(!isLight)

        if (document.body.className === 'light--theme') {
            document.body.classList.remove('light--theme')
            document.body.classList.add('dark--theme')
        } else {
            document.body.classList.add('light--theme')
            document.body.classList.remove('dark--theme')
        }
    }

    return(
        <header className='flex between'>
             <nav>
                <NavLink to="/" className='nav' exact='true'>Popular</NavLink>
                <NavLink to="/battle" className='nav'>Battle</NavLink>
             </nav>
             <span onClick={()=>{toggle()}} className='curser'>{isLight?'🔦':'💡'} </span>
        </header>
    )
}

export default Header