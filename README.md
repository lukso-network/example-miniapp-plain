# example-miniapp-vite-react-template

A template project demonstrating how to build mini-apps on [LUKSO](https://lukso.network), interacting with Universal Profiles on Universal Everything, built with [Vite.js](https://vite.dev).

# Introduction

Welcome to the Hangman Game with blockchain integration! This single-player game combines the fun of Hangman with the power of LUKSO technology, offering an innovative experience where your achievements are recorded on the blockchain.

The application use the Universal Profile ecosystem to authenticate users and interact with smart contracts. This ensures a secure and seamless experience.

# Features

Login: Login on [Universal_Everithing](https://universaleverything.io) with your UP and use [TheGrid] to interact with the miniapp.

Interactive Gameplay: Play the classic Hangman game with an engaging user interface.

Blockchain Integration: Leverage blockchain technology for secure transactions and interactions, in this scenarios blockchain is used to monitor your win and to reward the winner with a prize.

Universal Profile Support: Easily authenticate and manage your profile with the Lukso Universal Profile system, this one garantee a smooth and fluid user experience, it garantee a gasless interaction, in this way users can play to the game without thinking to pay gasfees.

## GETTING STARTED

# Install dependencies

```bash
npm install

npm run dev

Open your browser and go to http://localhost:5173 to play the game!
```

## Project Structure

- `src/context/GridProvider.tsx`: Core UP Provider implementation and wallet connection logic.
- `src/hooks/useSmartContract.tsx`: It contains the logic to interact with the blockchain, with ethers.js or with GridProvider.
- `src/components/`: All Components used to build the HangmanGame.
- `src/view/`: Is the interface that you see when you start the game.

# Tech Stack

- [React]: Frontend framework for building interactive UIs.
- [Vite]: Development environment for fast builds and hot module replacement.
- [Tailwind]: Styling framework for a sleek and modern design.
- [Ethers.js]: Library for interacting with Ethereum blockchain. -[@lukso/up-provider](https://github.com/lukso-network/tools-up-provider/tree/main): Facilitates integration with the Universal Profile ecosystem.

## Learn More

- [LUKSO Documentation](https://docs.lukso.tech/) - Learn about LUKSO ecosystem
- [UP Browser Extension](https://docs.lukso.tech/guides/browser-extension/install) - Install the Universal Profile Browser Extension

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.
