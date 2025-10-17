# 🔍 JSON Viewer Pro

A powerful, feature-rich JSON viewer and editor built with Next.js, React, and TypeScript. Transform your JSON data with professional-grade tools including formatting, validation, comparison, and more.

![JSON Viewer Pro](https://img.shields.io/badge/JSON-Viewer%20Pro-blue?style=for-the-badge&logo=json)
![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

### 🎯 Core Functionality

- **📝 JSON Input & Editing** - Paste, edit, and manipulate JSON data with real-time validation
- **👁️ Interactive JSON Display** - Beautiful, collapsible tree view with syntax highlighting
- **🔄 JSON Comparison** - Side-by-side comparison of two JSON objects with difference highlighting
- **📊 Statistics Dashboard** - Detailed analysis of JSON structure, size, and complexity

### 🛠️ JSON Processing Tools

- **🎨 Format JSON** - Pretty-print with proper indentation and spacing
- **📦 Minify JSON** - Compress JSON by removing unnecessary whitespace
- **✅ Validate JSON** - Real-time syntax validation with error reporting
- **🔧 Auto-Fix** - Intelligent repair of common JSON formatting issues
- **⚡ Quick Fix** - Fast resolution of basic syntax problems
- **🔄 Data Transformation** - Convert `[object Object]` strings to readable format

### 🎨 User Experience

- **🌙 Dark/Light Theme** - Toggle between themes with system preference detection
- **⌨️ Keyboard Shortcuts** - Power user shortcuts for all major functions
- **📋 Copy to Clipboard** - One-click copying of formatted JSON
- **💾 Export JSON** - Download JSON files directly to your device
- **🔍 Search Functionality** - Find specific keys or values within JSON data
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### 🎯 Advanced Features

- **🔍 Smart Parsing** - Handles various JSON formats including JavaScript object literals
- **📈 Data Quality Analysis** - Identifies potential issues in JSON structure
- **🎯 Error Diagnostics** - Detailed error messages with suggestions for fixes
- **🔄 Real-time Updates** - Instant feedback as you type and edit

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/json-viewer.git
cd json-viewer

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🎮 Usage Guide

### 📝 Basic JSON Viewing

1. **Navigate to the View Tab** - Click the "View" tab in the main interface
2. **Paste Your JSON** - Enter JSON data in the text area
3. **View Results** - See formatted JSON in the preview panel
4. **Check Statistics** - View detailed information about your JSON structure

### 🔄 JSON Comparison

1. **Switch to Compare Tab** - Click the "Compare" tab
2. **Enter Left JSON** - Paste the first JSON object
3. **Enter Right JSON** - Paste the second JSON object
4. **Analyze Differences** - View highlighted differences and comparison summary

### 🛠️ JSON Processing

| Action       | Button      | Description                        |
| ------------ | ----------- | ---------------------------------- |
| **Format**   | 🎨 Format   | Pretty-print JSON with indentation |
| **Minify**   | 📦 Minify   | Remove whitespace and compress     |
| **Validate** | ✅ Validate | Check JSON syntax validity         |
| **Export**   | 💾 Export   | Download JSON as file              |
| **Copy**     | 📋 Copy     | Copy to clipboard                  |
| **Clear**    | 🗑️ Clear    | Clear all content                  |

### 🔧 Auto-Fix Features

- **Quick Fix** ⚡ - Resolves basic syntax issues like trailing commas
- **Auto-Fix** 🔧 - Handles common formatting problems automatically
- **Data Fix** 🔄 - Transforms `[object Object]` strings to readable format

## 🏗️ Architecture

### 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── json-viewer/       # JSON viewer components
│   │   ├── CompareView.tsx    # Side-by-side comparison
│   │   ├── JsonDisplay.tsx    # JSON tree visualization
│   │   ├── JsonInput.tsx      # Input textarea
│   │   ├── JsonStatistics.tsx # Statistics panel
│   │   ├── JsonToolbar.tsx    # Action buttons
│   │   ├── KeyboardShortcuts.tsx # Keyboard handling
│   │   ├── TabButtons.tsx     # Tab navigation
│   │   ├── ThemeToggle.tsx    # Theme switcher
│   │   └── ViewTab.tsx        # Main view interface
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
│   └── useJsonViewer.ts   # Main application logic
├── lib/                   # Utility libraries
│   └── utils.ts           # Helper functions
└── utils/                 # Application utilities
    ├── constants.ts       # App constants
    ├── helpers.ts         # JSON processing functions
    └── types.ts           # TypeScript definitions
```

### 🔧 Key Components

#### `useJsonViewer` Hook

Central state management for the entire application, handling:

- JSON parsing and validation
- Tab management
- Comparison logic
- Statistics calculation
- Data quality analysis

#### JSON Processing Functions

- **`parseJsonInput`** - Smart JSON parsing with fallbacks
- **`formatJsonString`** - Pretty-printing with indentation
- **`minifyJsonString`** - Whitespace removal
- **`validateJsonString`** - Syntax validation
- **`compareJsonObjects`** - Deep object comparison
- **`getJsonStatistics`** - Structure analysis

## 🎨 Theming

The application supports both light and dark themes with:

- **System Preference Detection** - Automatically matches your OS theme
- **Manual Toggle** - Switch themes with the theme button
- **Consistent Design** - Tailwind CSS with custom color schemes
- **Accessibility** - High contrast ratios and readable fonts

## 📊 JSON Statistics

The statistics panel provides detailed insights:

- **📋 Type** - Object, Array, or primitive type
- **📏 Size** - File size in bytes, KB, or MB
- **🔑 Keys** - Number of object properties
- **📝 Items** - Number of array elements
- **📐 Depth** - Maximum nesting level

## 🔍 Comparison Features

### Difference Detection

- **➕ Added** - New properties or values
- **➖ Removed** - Deleted properties or values
- **🔄 Modified** - Changed values with path tracking
- **📊 Summary** - Total difference count

### Visual Indicators

- **🔴 Red** - Left JSON (removed/changed)
- **🟢 Green** - Right JSON (added/changed)
- **🟡 Yellow** - Modified values

## 🛡️ Error Handling

### Validation Features

- **Real-time Parsing** - Instant feedback as you type
- **Error Messages** - Clear descriptions of syntax issues
- **Common Issues** - Helpful suggestions for fixes
- **Debug Information** - Detailed parsing status

### Auto-Repair Capabilities

- **Trailing Commas** - Automatic removal
- **Object Literals** - JavaScript object support
- **String Encoding** - Double-encoded JSON handling
- **Whitespace** - Smart formatting

## 🚀 Performance

- **⚡ Fast Parsing** - Optimized JSON processing
- **🔄 Real-time Updates** - Efficient state management
- **📱 Responsive** - Smooth performance on all devices
- **💾 Memory Efficient** - Optimized for large JSON files

## 🧪 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production with Turbopack
npm run start        # Start production server
npm run lint         # Run ESLint

# Testing (if implemented)
npm run test         # Run test suite
npm run test:watch   # Run tests in watch mode
```

### Technology Stack

- **Framework**: Next.js 15.5.3 with App Router
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **JSON Viewer**: react-json-view-lite
- **Notifications**: Sonner
- **TypeScript**: Full type safety

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **react-json-view-lite** - For the beautiful JSON tree visualization
- **Lucide React** - For the comprehensive icon set
- **Tailwind CSS** - For the utility-first styling approach
- **Next.js Team** - For the amazing React framework

---

<div align="center">

**Made with ❤️ using Next.js, React, and TypeScript**

[⭐ Star this repo](https://github.com/your-username/json-viewer) • [🐛 Report Bug](https://github.com/your-username/json-viewer/issues) • [💡 Request Feature](https://github.com/your-username/json-viewer/issues)

</div>
