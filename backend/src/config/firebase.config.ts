import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDEWdH5ny3L1vsvKNjiB0se5lyjAppvnyA",
	authDomain: "pokedex-fd883.firebaseapp.com",
	projectId: "pokedex-fd883",
	storageBucket: "pokedex-fd883.appspot.com",
	messagingSenderId: "367323078545",
	appId: "1:367323078545:web:838424c1ec3d4584740430",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Connect firestore db
const firestore = getFirestore(app);

// available collections from fireStore
export const PokemonCollection = collection(firestore, "Pokemon");
export const UsersCollection = collection(firestore, "Users");
