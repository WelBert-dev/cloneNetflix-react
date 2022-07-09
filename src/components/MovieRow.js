import React, { useState } from 'react';
import './MovieRow.css';


export default ({title, items}) => {

    // Logica do scroll das listas < >
    
    const [scrollX, setScrollX] = useState();

    const handleLeftArrow = () => {
        // window.innerWidth: tamanho da tela de quem ta rodando
        let x = scrollX + Math.round(window.innerWidth / 2); // cada scrollada ele vai andar a metade da tela
        if (x > 0)
        {
            x = 0
        }
        setScrollX(x);
    }

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = items.results.length * 150; // largura da lista inteira 

        if ((window.innerWidth - listW) > x)
        {       
            x = (window.innerWidth - listW) - 60; // 60 pois é 30 pra cada div de scroll 
        }
        setScrollX(x)
    }

    return (
        <div className="movieRow">
            <h2>{title}</h2>

            <div className="movieRow--left" style={{fontSize: 50}} onClick={handleLeftArrow}>&lt;</div>
            <div className="movieRow--right" style={{fontSize: 50}} onClick={handleRightArrow}>&gt;</div>

            <div className="movieRow--listarea">

                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}>
                {items.results.length > 0 && items.results.map((item, key) => (
                    <div key={key} className="movieRow--item">
                        <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title}/>
                    </div>                  
                ))}
                </div>

            </div>
        </div>
    );
}
