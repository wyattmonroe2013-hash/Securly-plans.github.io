import {
  collection,
  addDoc,
  query,
  where,
  getDocs
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "./firebase.js";

async function hashPassword(password) {

  const msgUint8 =
    new TextEncoder().encode(password);

  const hashBuffer =
    await crypto.subtle.digest(
      "SHA-256",
      msgUint8
    );

  const hashArray =
    Array.from(new Uint8Array(hashBuffer));

  return hashArray
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");

}

window.signup = async function(username, password) {

  const passwordHash =
    await hashPassword(password);

  await addDoc(
    collection(db, "users"),
    {
      username,
      passwordHash,
      created: Date.now()
    }
  );

  alert("Account created");

};

window.login = async function(username, password) {

  const passwordHash =
    await hashPassword(password);

  const q = query(
    collection(db, "users"),
    where("username", "==", username),
    where("passwordHash", "==", passwordHash)
  );

  const snapshot =
    await getDocs(q);

  if(snapshot.empty) {

    alert("Invalid login");

  } else {

    localStorage.setItem(
      "loggedIn",
      "true"
    );

    localStorage.setItem(
      "username",
      username
    );

    alert("Logged in");

  }

};
