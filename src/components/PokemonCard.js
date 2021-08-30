import React from 'react'
import styles from '../styles/Card.module.css'

const PokemonCard = ({ card, addCard, removeCard, added }) => {
  const arrCute = [];
  const handleAddCard = () => {
    addCard(card);
  }
  const handleRemovCard = () => {
    removeCard(card)
  }
  const cardStats = {};

  // Get card damage stats
  function getDmg(card) {
    let arr;
    const reducer = (a, c) => a + c;

    if(card.attacks) {
      arr = card.attacks.map(atk => {
        const temp = parseInt(atk.damage.replace(/[^0-9]/g,''))
        if (Number.isNaN(temp)) {
          return 0;
        } else {
          return temp;
        }
      });
    } else {
      return 0;
    }

    return arr.reduce(reducer);
  }
  
  cardStats.dmg = getDmg(card);
  
  // Get all other stats
  cardStats.weak = 0;
  try {
    cardStats.hp = (parseInt(card.hp) > 100) ? 100 : parseInt(card.hp);
    cardStats.atkLength = card.attacks.length;
    cardStats.weak = card.weaknesses ? 100 : 0;
  } catch {
    // console.log(null);
  }
  // console.log(cardStats.dmg)
  if(Number.isNaN(cardStats.hp)) cardStats.hp = 0;

  // Calculate cuteness
  const cutes = Math.round(Math.abs(((cardStats.hp/10) + (cardStats.dmg/10) + 10 - (cardStats.weak/2)) / 5))
  for (let i = 0; i < cutes; i++) {
    arrCute.push(<img src="/cute.png" alt=""></img>);
  }

  return (
    <div className={styles.card}>
      {/* details */}
      <img src={card.imageUrl} alt="" />
      <div className={styles.cardDetails}>
        <div className={styles.cardTitle}>
          <h2>{card.name}</h2>
          <div className={styles.detailBtn} onClick={added ? handleRemovCard : handleAddCard} >
            {added ? <img src="/close.svg" alt="" /> : <h2>Add</h2>}
          </div>
        </div>
        
        <div className={added ? styles.cardSm : styles.cardMeters}>
          <h4>HP</h4>
          <meter max={100} min={0} value={cardStats.hp}></meter>
        </div>

        <div className={added ? styles.cardSm : styles.cardMeters}>
          <h4>STR</h4> 
          <meter max={100} min={0} value={cardStats.atkLength * 50}></meter>
        </div>
        
        <div className={added ? styles.cardSm : styles.cardMeters}>
          <h4>WEAK</h4> 
          <meter max={100} min={0} value={cardStats.weak}></meter>
        </div>

        <div className={styles.emotions}>
          {arrCute.map((c, i) => <div key={i}>{c}</div>)}
        </div>
        
      </div>
    </div>
  )
}

export default PokemonCard
