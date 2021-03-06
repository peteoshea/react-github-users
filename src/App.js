import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import CardList from './components/CardList';
import { openDB } from 'idb';

function App() {
  const [cards, setCards] = useState([]);

  const say = text => {
    speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  }

  const millisecondsInSecond = 1000;
  const sendNotification = (message, body) => {
    Notification.requestPermission();
    if (Notification.permission === 'granted') {
      const notification = new Notification(message, {
        body: body,
      });
      setTimeout(notification.close(), 3 * millisecondsInSecond);
    } else {
      console.log('Notifications permission: ' + Notification.permission);
    }
  };

  const addNewCard = async (card) => {
    console.log('Add: ' + card.login);
    setCards([...cards, card]);
    sendNotification('Added ' + card.login, card.name + ' is from ' + card.location);
    say('Added ' + card.name);

    if (!indexedDB) {
      console.warn('IndexedDB not supported');
      return;
    }
    const dbName = 'react-github-users';
    const storeName = 'users';
    const version = 1;
    const db = await openDB(dbName, version, {
      upgrade(db, oldVersion, newVersion, transaction) {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName);
        }
      },
    });
    await db.transaction(storeName, 'readwrite').objectStore(storeName).put(card, card.login);
  };

  const removeCard = async (username) => {
    console.log('Remove: ' + username);
    setCards(cards.filter((card) => card.login !== username));
    sendNotification('Removed ' + username);
    say('Removed ' + username);

    if (!indexedDB) {
      console.warn('IndexedDB not supported');
      return;
    }
    const dbName = 'react-github-users';
    const storeName = 'users';
    const version = 1;
    const db = await openDB(dbName, version, {
      upgrade(db, oldVersion, newVersion, transaction) {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName);
        }
      },
    });
    await db.transaction(storeName, 'readwrite').objectStore(storeName).delete(username);
  };

  useEffect(() => {
    async function fetchCards() {
      console.log('useEffect triggered');
      if (!indexedDB) {
        console.warn('IndexedDB not supported');
        return;
      }

      const dbName = 'react-github-users';
      const storeName = 'users';
      const version = 1;
      const db = await openDB(dbName, version, {
        upgrade(db, oldVersion, newVersion, transaction) {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName);
          }
        },
      });
      const users = await db.transaction(storeName).objectStore(storeName).getAll();
      setCards(users);
    }
    fetchCards();
  }, []); // Add empty array as second parameter so it only runs once

  return (
    <div>
      <h1 className="pt-10 text-center mt-6 text-3xl leading-9 font-extrabold text-gray-900">
        Search a GitHub User
      </h1>
      <Form onSubmit={addNewCard} />
      <CardList cards={cards} removeCard={removeCard} />
    </div>
  );
}

export default App;
