# Game of Life Encryption - Project Overview

## Introduction

This project demonstrates a novel encryption method inspired by Conway's Game of Life. It combines cellular automata principles with traditional cryptographic techniques to create a unique and visually engaging encryption process.
I came up with it after a healty does of youtube on the game of life. 

## Concept

The encryption method utilizes a grid-based system similar to Conway's Game of Life. The key features include:

1. **Grid Initialization**: A 64x64 grid is initialized using a hash of the encryption key.
2. **Custom Evolution Rules**: Unlike traditional Game of Life, this system uses custom rules derived from the encryption key.
3. **Multiple Generations**: The grid evolves through 100 generations, creating a complex pattern.
4. **Noise Injection**: Periodic noise is introduced to enhance randomness and security.
5. **Key Generation**: The final grid state is used to generate a unique encryption key.
6. **XOR Encryption**: The generated key is used in a XOR operation with the plaintext.

## Limitations of the Demo

The web application serves as a demonstration and does not include all features described in the full report. Key limitations include:

1. **Simplified Implementation**: Some advanced features from the full encryption method are omitted for clarity.
2. **Fixed Parameters**: The demo uses fixed grid size and generation count, which would be variable in a full implementation.
3. **Limited Security**: This demo should not be used for actual secure communications.
4. **Visualization Focus**: The app emphasizes visual representation over computational efficiency.

## Full Report

For a comprehensive understanding of the proposed encryption method, including:
- Detailed mathematical analysis
- Security considerations
- Performance benchmarks
- Potential applications and future work

Please refer to the downloadable full report.

## Acknowledgments

This project was developed with educational resources from YouTube and assistance from ChatGPT. These tools were instrumental in conceptualizing and implementing this novel encryption approach.

## About the Author

This project was created by me, Iordache Mihai Bogdan, a passionate developer exploring the intersection of cellular automata and cryptography. For more information or to connect:

- LinkedIn: [Iordache Mihai Bogdan](https://www.linkedin.com/in/iordache-mihai-bogdan-676444187/)

## Disclaimer

This project is for educational and demonstration purposes only. It should not be used for securing sensitive information without further development and security auditing.

## Running 
 
To run this Vite app, follow these steps:

1. Make sure you have Node.js installed on your machine.
2. Open a terminal and navigate to the project directory.
3. Install the project dependencies by running the following command:
    ```
    npm install
    ```
4. Once the dependencies are installed, start the development server by running the following command:
    ```
    npm run dev
    ```
    This will start the Vite development server and compile the app.
5. Open your web browser and visit the localhost to see the running app.

That's it! You should now be able to see and interact with the Game of Life Encryption Algorithm app in your browser.
