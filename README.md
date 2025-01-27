# Connect-4 AI

This repository contains the implementation of a Connect-4 AI game written in Python. The project is designed with modularity and scalability in mind, making it easy to extend and test different strategies. It showcases core concepts of artificial intelligence, game state management, and algorithmic efficiency.

## Files Overview

- **`agents.py`**: This file defines the various agents that can play the game, including AI strategies. Each agent uses a unique approach, such as random moves, minimax algorithms, or heuristic-based strategies, to compete in Connect-4.

- **`boards.py`**: This file contains predefined test boards for debugging and testing the game logic. These boards allow developers to validate specific scenarios and edge cases, ensuring the game behaves as expected under various conditions. Additionally, it includes functionality for generating custom boards dynamically based on user specifications.

- **`connect383.py`**: The core file of the project, implementing the game logic and state management. Key functionalities include:
  - **Game State Management**: Tracks the current state of the board, including player turns, available moves, and the overall progress of the game.
  - **Successor Generation**: Generates valid moves and their resulting game states, enabling the exploration of possible outcomes.
  - **Scoring System**: Awards points based on streak lengths (e.g., three or more consecutive pieces in a row, column, or diagonal). Longer streaks are rewarded exponentially higher points to emphasize their strategic value.
  - **Main Game Loop**: Facilitates gameplay between two players (human or AI), manages turn-taking, and determines the winner based on final scores.

## Features

- **Modular Design**: The project is organized into distinct components, each handling specific responsibilities. This structure makes it easier to extend or modify individual aspects without impacting the entire system.

- **AI Strategies**:
  - Supports multiple types of AI players with varying levels of complexity, such as random move selection or strategic decision-making using minimax and pruning techniques.
  - Provides a flexible framework for adding new AI strategies or adjusting existing ones.

- **Dynamic Board Evaluation**:
  - Utilizes efficient algorithms to evaluate the board for scoring potential and identifying winning moves.
  - Includes methods to retrieve rows, columns, and diagonals for streak analysis, ensuring comprehensive game state evaluation.

- **Scalability**:
  - The game can handle boards of varying sizes and configurations, offering flexibility for different Connect-4 variations.
  - The modular approach allows for easy adaptation to new rules or customizations.

- **Testing and Debugging**:
  - Includes a suite of predefined test boards to validate functionality and debug specific scenarios.
  - Offers tools for developers to create and test custom board configurations, making it easier to identify and fix issues.

---

This project demonstrates the application of artificial intelligence techniques in a classic game setting, emphasizing modular design and efficient problem-solving strategies. It serves as an excellent foundation for exploring more advanced AI concepts or experimenting with game theory.
