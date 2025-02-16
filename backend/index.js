const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

// 1) Config du serveur
const app = express();
app.use(cors());
app.use(express.json()); // pour parser du JSON dans le body d'une requête

// 2) Config de la connexion PostgreSQL
// Adapte les paramètres à ta config
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',  // ou l’adresse du serveur DB
  database: 'ma_base',
  password: 'mon_mot_de_passe',
  port: 5432,
});

// 3) Route POST: sauvegarder un texte
app.post('/api/texte', async (req, res) => {
  try {
    const { texte } = req.body;
    // Insérer dans la table "entrees" (que tu dois créer)
    await pool.query('INSERT INTO entrees (texte) VALUES ($1)', [texte]);
    res.json({ message: 'Texte sauvegardé !' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 4) Route GET: récupérer la dernière entrée
app.get('/api/texte/last', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM entrees ORDER BY id DESC LIMIT 1');
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.json({ texte: 'Aucune donnée disponible' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 5) Lancement du serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
