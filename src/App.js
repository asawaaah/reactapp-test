import React, { useState } from 'react';
import { supabase } from './supabaseClient'; // chemin vers le fichier créé ci-dessus

function App() {
  const [inputTexte, setInputTexte] = useState('');
  const [lastTexte, setLastTexte] = useState('');

  // Fonction pour insérer un nouveau texte
  const handleSave = async () => {
    try {
      // "entrees" est le nom de ta table
      const { data, error } = await supabase
        .from('entrees')
        .insert([{ texte: inputTexte }]);

      if (error) {
        console.error(error);
        alert('Erreur lors de la sauvegarde');
      } else {
        alert('Texte enregistré !');
      }
    } catch (err) {
      console.error(err);
      alert('Erreur inattendue');
    }
  };

  // Fonction pour récupérer la dernière entrée
  const handleGetLast = async () => {
    try {
      const { data, error } = await supabase
        .from('entrees')
        .select('*')
        .order('id', { ascending: false })
        .limit(1);

      if (error) {
        console.error(error);
        alert('Erreur lors de la récupération');
      } else if (data && data.length > 0) {
        setLastTexte(data[0].texte);
      } else {
        setLastTexte('Aucune donnée');
      }
    } catch (err) {
      console.error(err);
      alert('Erreur inattendue');
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1>Ma super app React + Supabase</h1>
      <input
        type="text"
        placeholder="Saisis un texte"
        value={inputTexte}
        onChange={(e) => setInputTexte(e.target.value)}
      />
      <button onClick={handleSave}>Enregistrer</button>

      <button onClick={handleGetLast}>Afficher la dernière entrée</button>
      <p>Dernière entrée : {lastTexte}</p>
    </div>
  );
}

export default App;
