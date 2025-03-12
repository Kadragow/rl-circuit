# RL Circuit Project

## Overview

**RL Circuit Project** (technical name: `rl-circuit`) is an interactive web application built using the modern React library, with TypeScript as the primary programming language. The application is designed to allow users to model and simulate the behavior of RL circuits over time.

## Key Features

The main functionality of the application revolves around accurately calculating the current **I(t)** based on a linear voltage function **U(t)**, determined by user-defined points. Users can input key circuit parameters such as:

- **Resistance** — the value of the resistor in the circuit,
- **Inductance** — the value of the inductor,
- **Step size** — the time step for the controller.

Once the data is provided, the application uses appropriate equations to compute the current's variation over time for the specified points (determined by the number of samples). The results are presented graphically in a chart, allowing users to analyze the circuit's behavior effectively.

## Live Demo

You can try the live demo of the application here: [RL Circuit Live Demo](https://rl-circuit.vercel.app/)

## Technologies Used

- **React** — for building the user interface,
- **TypeScript** — for type-safe programming,
- **Chart.js** (or another chart library) — for visualizing the results,
- **Vercel** — for deployment.

## Installation and Usage

1. Clone the repository:

```bash
git clone https://github.com/yourusername/rl-circuit.git
cd rl-circuit
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Contributing

Contributions are welcome! If you'd like to improve the app, feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
