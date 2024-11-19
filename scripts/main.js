import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css';
import { initGame, handleKeyPress, restartGame } from './game.js';

document.addEventListener('DOMContentLoaded', () => {
    initGame();
    document.addEventListener('keydown', handleKeyPress);
    document.getElementById('restart-btn').addEventListener('click', restartGame);
});