import {Button, Container, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
// import {endSession, getSession, isLoggedIn} from "../session";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";

// import {signInWithCustomToken, getAuth} from "firebase/auth";
import {getAuth, signOut} from "firebase/auth";

const db = getFirestore(app);

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
/* function User() {

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

export default User; */




export default function User() {

  const auth = getAuth();

  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [worksArr, setWorksArr] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    
    if (user != null) {
      alert(user.uid);
    } else {
      navigate("/login");
    }

    // let session = getSession();
    // setEmail(session.email);

    // ЭТО ЗАГЛУШКА: ЗАМЕНИТЬ!
    // если сессия сохранена
    // let auth = getAuth(app);
    // signInWithCustomToken(auth, session.accessToken);

    // Получение данных
    const asyncEffect = async () => {
      const querySnapshot = await getDocs(collection(db, "work"));

      let result = [];
      querySnapshot.forEach((doc) => {
        result.push([doc.id, doc.data()]);
      });

      setWorksArr(result);
    };

    asyncEffect();
  }, [navigate]);

  let works = [];
  if (worksArr.length) {
    works = worksArr[0][0];
  }

  const onLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <Container maxWidth="xs" sx={{mt: 2}}>
      <div>
        {works}
        {FormForWork()}
      </div>
      <Typography variant="h6" component="h1" textAlign="center" gutterBottom>
        You're logged in as:
      </Typography>
      <Typography variant="h5" component="h1" textAlign="center" gutterBottom>
        {email}
      </Typography>
      <Typography variant="p" component="p" textAlign="center" gutterBottom>
        Check the console for your (access/session) token.
      </Typography>
      <Button variant="contained" color="error" onClick={onLogout} sx={{mt: 3}} fullWidth>
        Log out
      </Button>
    </Container>
  )
}