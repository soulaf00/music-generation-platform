# API de Génération Musicale

## Description

Cette API REST permet de générer un fichier audio à partir d'une description textuelle fournie par l'utilisateur.

Le service est développé avec Flask et utilise le modèle `facebook/musicgen-small` de Hugging Face pour la génération musicale.

Ce projet constitue la partie backend d'une plateforme web de génération musicale basée sur l'intelligence artificielle.

## Technologies utilisées

- Python
- Flask
- Hugging Face Transformers
- MusicGen
- PyTorch
- SciPy

## Modèle utilisé

Le modèle utilisé est :

facebook/musicgen-small

La version `small` de MusicGen a été choisie afin de réduire les ressources matérielles nécessaires à l'exécution du modèle.

## Installation

Créer et activer un environnement virtuel Python.

Installer les dépendances :

```bash
pip install -r requirements.txt