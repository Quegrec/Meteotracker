// Gère l'enregistrement et l'authentification des utilisateurs

import User from '../models/userModel.js';

export const createUser = async (req, res) => {
    const { id_google, email, name, picture } = req.body;
    try {
        // Vérification de l'existence de l'utilisateur
        const existingUser = await User.findOne({ id_google });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with the given Google ID.' });
        }

        // Création d'un nouvel utilisateur
        const newUser = new User({ id_google, email, name, picture });
        const savedUser = await newUser.save();

        // Réponse en cas de succès
        res.status(201).json(savedUser);
    } catch (error) {
        // Gestion des erreurs
        res.status(500).json({ message: 'An error occurred while creating the user.', error: error.message });
    }
    
};

