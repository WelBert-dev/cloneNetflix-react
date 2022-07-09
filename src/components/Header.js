import React from 'react';
import './Header.css';




export default ({black}) => {
    return ( // só vai ficar com a faixa preta no header se black == true
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="Logo_netflix"/>
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" alt="Logo_user"/>
                </a>
            </div>
        </header>
    );
}
