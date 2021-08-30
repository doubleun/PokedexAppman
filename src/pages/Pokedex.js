import styles from '../styles/Pokedex.module.css'
import React, {useState, useEffect, useRef} from 'react'
import PokemonCard from '../components/PokemonCard';
import {useCards} from '../context/SelectedCardsContext'

const Pokedex = () => {
  const [overlay, setOverlay] = useState(false);
  const [matchingCards, setMatchingCards] = useState();
  const overlayEl = useRef();
  const searchInput = useRef();
  const { cards, setCards, selectedCards, addCard, removeCard } = useCards();

  const handleClickOutside = (e) => {
    if (overlayEl && e.target.id === "over") {
      setOverlay(false)
      return
    }
  }

  const handleCardSearch = () => {
    setMatchingCards(cards.filter(card => 
      card.name.toLowerCase().includes(searchInput.current.value.toLowerCase()) 
      || card.subtype.toLowerCase().includes(searchInput.current.value.toLowerCase())));
  }
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    const getPokemons = async () => {
      try {
        const res = await fetch('http://localhost:3030/api/cards');
        const data = await res.json();
        console.log(data.cards);
        setCards(data.cards);
      } catch(err) {
        console.log(err)
      }
    }
    getPokemons();
    
  }, []);

  useEffect(() => {
    setMatchingCards(cards);
  }, [overlay, cards]);

  return (
    <div className={styles.container}>
      {/* overlay */}
      <div 
      className={overlay && styles.overlay}
      ref={overlayEl}
      id="over"
      >
      {overlay 
        ? <div className="pokeMenu">
            <input type="text" 
            placeholder="Find pokemon" 
            className={styles.searchPokemon} 
            onChange={handleCardSearch}
            ref={searchInput}
            />
            <div className={styles.pokemonList}>
              {matchingCards.map(card => {
                return <PokemonCard card={card} addCard={addCard} key={card.id}/>
              })}
            </div>
          </div>
        : null
      }
      </div>

      {/* Display pokemon on the main page */}
      <div className={styles.selectedGrid}>
        {selectedCards && selectedCards.map(card => {
         return  <PokemonCard card={card} key={card.id} removeCard={removeCard} added/>
        })}
      </div>
        
      <div className={styles.footer}>
        <button 
        className={styles.addBtn}
        onClick={() => setOverlay(true)}
        >
          add
        </button>
      </div>
    </div>
  )
}

export default Pokedex
