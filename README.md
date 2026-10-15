# ChatBot Project

A responsive, client-side chatbot web application built with **React 19** and **Vite**. This project simulates an interactive conversational chat interface featuring automated responses, simulated latency, message persistence via local storage, and automatic scrolling.

Developed as a hands-on frontend project to practice core React concepts, component architecture, state management, custom hooks, and asynchronous UI workflows.

---

## About the Project

The **ChatBot Project** is an interactive single-page application where users can converse with a simulated bot inside a clean chat interface. When a user submits a message, the application simulates a realistic chat experience by displaying an animated loading spinner for one second before returning an automated reply.

The chatbot operates entirely on the client side. Rather than connecting to an external AI model or backend server, it utilizes the educational `supersimpledev` library to match user inputs against predefined responses using string similarity matching. The app also persists the complete chat history in the browser's `localStorage` so messages remain available after page reloads.

---

## Features

- **Interactive Chat Interface**: Displays a conversational message feed with distinctive styling, alignments, and avatar icons for the user and the bot.
- **Simulated Asynchronous Responses**: Introduces an artificial 1-second delay with an animated loading spinner before delivering replies to mimic real-world network latency.
- **Rule-Based Bot Responses**: Handles predefined queries using string similarity matching (e.g., flipping a coin, rolling a dice, providing today's date, and greetings) along with custom registered responses (`goodbye` and `give me a unique id`).
- **Keyboard Shortcuts**:
  - `Enter`: Submits the current message.
  - `Escape`: Clears the text currently typed in the input box.
- **Input Validation & Submission Guarding**: Ignores empty or whitespace-only messages and prevents duplicate submissions while awaiting a bot response.
- **Local Storage Persistence**: Automatically syncs conversation history to browser `localStorage`, restoring past messages upon reopening or refreshing the page.
- **Reset Chat**: A "Clear" button resets conversation state and wipes saved messages from `localStorage`.
- **Auto-Scroll Behavior**: Automatically scrolls the conversation window to the bottom whenever a new message or loading spinner appears.
- **Empty State Welcome Message**: Displays an introductory greeting message prompting the user to send their first message when the chat history is empty.

---

## Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **React 19** (`react`, `react-dom`) | Core UI library for component hierarchy, declarative rendering, reactive state, and side effects. |
| **Vite 6** (`vite`, `@vitejs/plugin-react`) | Fast modern build tool and development server with Hot Module Replacement (HMR). |
| **JavaScript (ES2020+)** | Application logic utilizing `async/await`, Promises, array spread operators, destructuring, and web APIs like `crypto.randomUUID()`. |
| **Day.js** (`dayjs`) | Lightweight date-time library for generating UNIX timestamps (`valueOf()`) and formatting message timestamps (`h:mma`). |
| **supersimpledev** (`supersimpledev`) | Educational utility library providing the client-side mock `Chatbot` engine and response matcher. |
| **CSS3** | Modular component-level styles utilizing Flexbox, custom message bubbles, responsive containers, and hidden scrollbars. |
| **ESLint 9** | Modern flat-configuration linter for enforcing code quality and React Hooks rules. |

---

## Key Concepts Demonstrated

- **Component Architecture & Props**: Modular component structure (`App`, `ChatMessages`, `ChatMessage`, `ChatInput`) with clean unidirectional data flow and callback passing.
- **State Management (`useState`)**:
  - Global conversation state (`chatMessages`) lifted to `App`.
  - Local component state for controlled input fields (`inputText`) and submission locks (`isLoading`).
- **Side Effects & Lifecycle (`useEffect`)**:
  - Synchronizing chat messages to `localStorage` on every state change.
  - Registering custom chatbot response definitions on component mount.
- **Custom Hooks & DOM References (`useRef`)**:
  - Encapsulating DOM scrolling logic into a reusable `useAutoScroll` hook that keeps `scrollTop` pinned to `scrollHeight` as messages update.
- **Asynchronous Flow Management**:
  - Handling asynchronous operations with `async/await`.
  - Rendering transient loading UI states (animated spinner GIF) during asynchronous processing.
- **Event Handling & Keyboard Controls**:
  - Handling input changes (`onChange`), button clicks (`onClick`), and custom keyboard shortcuts (`onKeyDown`).
- **Conditional Rendering**:
  - Displaying a welcome banner only when the message list is empty.
  - Dynamically applying CSS classes and positioning user vs. robot profile avatars.
  - Rendering timestamps only for messages with recorded time values.

---

## Project Structure

```text
chatbot-project/
├── index.html              # HTML entry point containing the #root mount element
├── package.json            # Project metadata, dependencies, and npm run scripts
├── package-lock.json       # Lockfile for deterministic dependency resolution
├── vite.config.js          # Vite build configuration with React plugin
├── eslint.config.js        # ESLint flat configuration for React and JS
├── .gitignore              # Git ignore rules for node_modules, build outputs, and logs
├── README.md               # Project documentation
└── src/
    ├── main.jsx            # Application entry point rendering <App /> into the DOM
    ├── index.css           # Global body styling and default font families
    ├── App.jsx             # Top-level component managing state, localStorage, and responses
    ├── App.css             # Main container layout and welcome message styling
    ├── assets/             # Static graphic assets
    │   ├── ChadCat.jpeg    # User profile avatar image
    │   ├── robot.png       # Bot profile avatar image
    │   ├── loading-spinner.gif # Spinner displayed while the bot generates a response
    │   └── user.png        # Default user avatar graphic (currently unused in UI)
    └── components/         # Modular UI components and corresponding CSS
        ├── ChatInput.jsx   # Text input, keyboard handlers, and Send/Clear buttons
        ├── ChatInput.css   # Styles for input bar, buttons, and loading spinner
        ├── ChatMessage.jsx # Message bubble rendering text, avatar, and timestamp
        ├── ChatMessage.css # Flexbox styles for user/bot message layout and bubbles
        ├── ChatMessages.jsx# Scrollable message list container and useAutoScroll hook
        └── ChatMessages.css# Overflow container styling with hidden scrollbar
```

---

## How to Run the Project

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` (bundled with Node.js)

### Installation & Setup

1. **Clone or download the project repository:**
   ```bash
   git clone <repository-url>
   cd chatbot-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open the local server URL displayed in your terminal (typically `http://localhost:5173`) in your web browser.

### Additional Scripts

- **`npm run build`**: Builds optimized production assets to the `dist/` directory.
- **`npm run preview`**: Serves the production build locally for verification.
- **`npm run lint`**: Runs ESLint across the codebase to check for code quality and syntax issues.

---

## Current Limitations

- **Client-Side Mock Responses (No Real AI / Backend)**: The chatbot does not connect to an LLM API (such as OpenAI or Google Gemini) or a backend server. Responses are matched locally against a fixed set of phrases using string similarity. Unrecognized queries receive a fallback response explaining available commands.
- **Loading State in Persisted Message Array**: During message transmission, a JSX `<img />` element representing the loading spinner is temporarily inserted into the `chatMessages` array. Because React elements do not serialize cleanly via `JSON.stringify`, refreshing or closing the browser during that 1-second window can leave malformed message entries in `localStorage`.
- **Browser-Only Storage**: Message persistence is limited to the current browser's `localStorage`. Data is not synchronized across different devices or browsers and will be lost if browser storage is cleared.
- **Fixed Layout Dimensions**: The application layout is centered with a fixed maximum width of `800px` and a height of `100vh`, without dedicated media queries for small-screen devices or mobile on-screen keyboards.
- **Unused Asset**: `src/assets/user.png` is present in the repository assets directory but is not referenced in the application, as `ChadCat.jpeg` is hardcoded as the user profile image.

---

## Possible Improvements

- **Real AI API Integration**: Replace the mock bot engine with a connection to an AI API (such as Google Gemini API or a custom backend) for intelligent, open-ended conversations.
- **Refactor Loading State**: Decouple the loading indicator from the `chatMessages` array by managing it through a distinct boolean state or dedicated message type flag, avoiding JSX elements in persisted state.
- **Mobile Responsiveness**: Add CSS media queries and viewport adjustments to improve usability on mobile devices and handle virtual keyboard popups gracefully.
- **Enhanced Message Management**: Add features such as individual message deletion, message copying, export to text/JSON, or a confirmation prompt before clearing chat history.
- **Automated Testing**: Implement unit and integration tests using Vitest and React Testing Library to test component rendering, user input, and auto-scroll behavior.
