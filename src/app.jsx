import React, { useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from './firebaseClient'; 
const App = () => {
  useEffect(() => {
    const sectionRef = ref(db, 'sections');

    onValue(sectionRef, (snapshot) => {
      const data = snapshot.val();
      console.log("📡 Firebase Realtime Data:", data);
    });
  }, []);

  return (
    <div>
      <h1>🔥 Firebase Connected</h1>
      <p>Check console for data.</p>
    </div>
  );
};

export default App;

