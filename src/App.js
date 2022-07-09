import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);


  useEffect (()=>{
    const loadAll = async () => {
      // pegando a lista total
      let list = await Tmdb.getHomeList();
      //setMovieList(list);

      // pegando o Featured
      let originals = list.filter(x => x.slug == 'originals');

      // gera um numero aleatório para pegar um filme aleatório (original netflix)
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randomChosen];

      // pega informações adicionais sobre uma serie x, infos que n vem no getHomeList generico
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = () => {

      // scrollY = vertical
      // scrollX = horizontal

      if (window.scrollY > 10)      {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    // toda ocorrencia de scroll vai rodar o metodo 'scrollListener'
    window.addEventListener('scroll', scrollListener) 

    // remove o evento toda vez que sai da pagina
    return () => {
      window.removeEventListener('scrol', scrollListener)
    }
  },[]);

  return (
    <div className="page">

      <Header black={blackHeader}/>

      {featuredData &&
      <FeaturedMovie item={featuredData}/>
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      <footer>
        Feito com <span role="img" area-label="coração">♥</span> pelo WEC<br/>
        Direitos de imagem para Netflix.<br/>
        Dados pegos do site themoviedb.org
      </footer>
      
      {movieList.length <= 0 && 
        <div className="loading">
          <img src="https://media4.giphy.com/media/y6Sl42U3xEFkk/giphy.gif?cid=ecf05e47mt11q325nx688mogrd151uxg4qr28tcop3d97jxe&rid=giphy.gif&ct=g" alt ="Carregando"/>
        </div>      
      }


    </div>
  );
}
