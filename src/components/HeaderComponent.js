import React from 'react'

export const HeaderComponent = () => {
  return (
    <div>
        <header>
            <nav className= 'navbar navbar-dark bg-primary'>
                <div>
                    <a href='/' className='navbar-brand'>Gestión de clientes</a>
                </div>
            </nav>   
        </header>
    </div>
  )
}

export default HeaderComponent;