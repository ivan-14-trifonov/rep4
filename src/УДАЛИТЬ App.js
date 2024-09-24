import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react';

import { collection, addDoc, getDocs } from "firebase/firestore";

// Запись данных
async function AddWork(name, number) {
  try {
    const docRef = await addDoc(collection(db, "work"), {
      name: name,
      number: number,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function FormForWork() {
  async function forWork(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const work = formData.get("work");
    const number = formData.get("number");
    AddWork(work, number);
    alert(`Данные: '${work}', '${number}'`);
  }
  return (
    <form onSubmit={forWork}>
      <input name="work" placeholder="Произведение" />
      <input name="number" placeholder="Номер" />
      <button type="submit">Сохранить</button>
    </form>
  );
}

// Основная функция
function App() {

  // Получение данных
  const [worksArr, setWorksArr] = useState([]);

  useEffect(() => {
    const asyncEffect = async () => {
      const querySnapshot = await getDocs(collection(db, "work"));

      let result = [];
      querySnapshot.forEach((doc) => {
        result.push([doc.id, doc.data()]);
      });

      setWorksArr(result);
    };

    asyncEffect();
  }, []);

  let works = [];
  if (worksArr.length) {
    works = worksArr[0][0];
  }

  return (
    <div>
        {works}
        {FormForWork()}
    </div>
  );
}

export default App;

