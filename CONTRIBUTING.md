# Contributing to Cerberus IAM Auth UI

First off, thank you for considering contributing to Cerberus IAM Auth UI! It's people like you that make this project better for everyone.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps to reproduce the problem
- Provide specific examples to demonstrate the steps
- Describe the behavior you observed and what you expected to see
- Include screenshots if applicable
- Include your environment details (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- Use a clear and descriptive title
- Provide a detailed description of the suggested enhancement
- Explain why this enhancement would be useful
- List any alternative solutions or features you've considered

### Pull Requests

1. Fork the repository and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure the test suite passes
4. Make sure your code lints
5. Issue the pull request

## Development Setup

### Prerequisites

- Node.js 20 or higher
- npm 9 or higher

### Setup Steps

1. Clone your fork:

```bash
git clone https://github.com/YOUR_USERNAME/auth-ui.git
cd auth-ui
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example` (if available)

4. Start the development server:

```bash
npm run dev
```

## Development Workflow

### Running Tests

```bash
# Run tests in watch mode
npm run test

# Run tests once
npm run test:ci

# Run tests with coverage
npm run test:coverage
```

### Linting and Formatting

```bash
# Run ESLint
npm run lint

# Fix ESLint errors
npm run lint:fix

# Check formatting
npm run format:check

# Fix formatting
npm run format
```

### Building

```bash
npm run build
```

## Style Guidelines

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

Example:

```
Add user authentication flow

- Implement login component
- Add auth context provider
- Create protected route wrapper

Closes #123
```

### TypeScript Style Guide

- Use TypeScript for all new code
- Define types for component props
- Use interfaces for object types
- Avoid using `any` type
- Use descriptive variable names

### React Style Guide

- Use functional components with hooks
- Use named exports for components
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper prop types

### Testing Guidelines

- Write tests for all new features
- Maintain or improve code coverage
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Mock external dependencies

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # React context providers
├── lib/            # Utility functions and helpers
├── pages/          # Page components
└── test/           # Test utilities and setup
```

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.
