import React, {useContext, useState} from 'react'

const SelectedCardsContext = React.createContext();

export function useCards() {
  return useContext(SelectedCardsContext);
}

export function CardsProvider({children}) {
  const [selectedCards, setSelectedCards] = useState([]);
  const [cards, setCards] = useState();

  function addCard(newCard) {
    setSelectedCards(prevArr => {
      if(!prevArr.includes(newCard)) {
        return [...prevArr, newCard];
      }
      return [...prevArr];
    })

    setCards(prevArr => {
      return prevArr.filter(card => card.id !== newCard.id)
    })
  }

  function removeCard(selectedCard) {
    console.log(selectedCard)
    setSelectedCards(prevArr => {
      return prevArr.filter(card => card.id !== selectedCard.id);
    })

    setCards(prevArr => {
      return [...prevArr, selectedCard];
    })
  }

  const value = {
    cards,
    setCards,
    selectedCards,
    addCard,
    removeCard
  }

  return (
    <SelectedCardsContext.Provider value={value}>
      {children}
    </SelectedCardsContext.Provider>
  )
}