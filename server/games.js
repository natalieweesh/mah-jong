let games = [];

// map of room names to interval IDs
let pendingRemovals = {};

const addGame = (room, users) => {
  
  console.log('room', room)
  console.log('find anything?', games.find((game) => game.id == room))
  if (games.find((game) => game.id == room)) {
    console.log('already started game with id', room)
    return;
  }
  const newCards = [];
  // users.map((user, i) => {
  //   const card = {
  //     startTurnIndex: i,
  //     currentTurnIndex: i,
  //     steps: [],
  //     submitted: false,
  //     names: [],
  //   }
  //   newCards.push(card);
  // })
  const newGame = {
    id: room,
    cards: newCards,
    newRound: false,
    finishedGame: false,
    currentRound: 0,
    dice: [1, 1],
  }
  games.push(newGame)
  console.log('games', games);
  console.log('users', users)
  return games;
}

const restartGame = (room, users) => {
  const gameToRemove = games.findIndex((game) => game.id == room);
  console.log('game to remove', gameToRemove)
  if (gameToRemove === -1) {
    return
  }
  console.log('games length', games.length)
  games.splice(gameToRemove, 1);
  console.log('games length after', games.length)
  users.map((u) => {
    u.answerSubmitted = false;
  })
  return games;
}

const getGame = (id) => games.find((game) => game.id === id);

const updateCards = (room, cards) => {
  let game = games.find((game) => game.id === room);
  game.cards = cards;
  return game;
}

const updateTile = (room, id, x, y, user) => {
  let game = games.find((game) => game.id === room);
  if (game && game.cards) {
    card = game.cards.find((card) => card.id === id);
    card.x = x;
    card.y = y;
    card.user = user;
    return card;
  }
}

const rollDice = (room) => {
  let game = games.find((game) => game.id === room);
  const roll1 = Math.floor(Math.random() * 6) + 1;
  const roll2 = Math.floor(Math.random() * 6) + 1;
  game.dice = [roll1, roll2];
  return game;
}

const endGame = (room) => {
  let game = games.find((game) => game.id === room);
  game.finishedGame = true;
  return game;
}

const removeGame = (room) => {
  const index = games.findIndex((game) => game.id === room);

  if (index !== -1) {
    console.log('games before deleting', games)
    games.splice(index, 1)[0];
    console.log('games after deleting', games)
  }
}

const scheduleRemoveGame = (room, getUsersInRoom) => {
  let intervalId = setInterval(() => {
    console.log('deleting this room', room);
    const index = games.findIndex((game) => game.id === room);

    if (index !== -1) {
      const users = getUsersInRoom(room)
      if (users.length > 0) {
        console.log('there are still users in the room so do not delete it')
        return;
      } else {
        //delete the room for real
        console.log('games before deleting', games)
        games.splice(index, 1)[0];
        let intervalToStop = pendingRemovals[room];
        if (intervalToStop) {
          clearInterval(intervalToStop);
          delete pendingRemovals[room];
        }
        console.log('games after deleting', games)
      }
    }

  }, 5400000) // check 1.5 hours
  pendingRemovals[room] = intervalId;
}

module.exports = { addGame, getGame, restartGame, removeGame, scheduleRemoveGame, updateCards, updateTile, rollDice, endGame };