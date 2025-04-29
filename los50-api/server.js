import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import participants from './Models/Data/schema_Participant.js';
import Participant from './Models/Schema_Participants.js';

// Inicializar Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para parsear JSON en las peticiones
app.use(morgan('dev')); // Logs de las peticiones

// 1. Obtener todos los participantes
app.get('/api/participants', (req, res) => {
    res.json(participants);
  });
  
  app.post('/api/vote/:id', (req, res) => {
    const participantId = parseInt(req.params.id);
    const participant = participants.find(p => p.id === participantId);
  
    if (!participant) {
      return res.status(404).json({ error: 'Participante no encontrado' });
    }
  
    participant.votesToSave += 1;
    res.json({ success: true, participant });
  });

// 3. Añadir un nuevo participante (POST) - Opcional
app.post('/api/participants', async (req, res) => {
  try {
    const newParticipant = new Participant(req.body);
    await newParticipant.save();
    res.status(201).json(newParticipant);
  } catch (error) {
    res.status(400).json({ error: 'Datos inválidos' });
  }
});

// Iniciar servidor
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`🎉 Servidor API corriendo en http://localhost:${PORT}`);
});