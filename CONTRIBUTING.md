# Contributing to CanvasToAPI

Thank you for your interest in contributing to CanvasToAPI! This document provides guidelines and steps for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How to Contribute

### Reporting Bugs

Before submitting a bug report, please:

1. Check existing issues to avoid duplicates
2. Use the bug report template
3. Include:
   - Clear description of the issue
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Node version, etc.)
   - Relevant logs or screenshots

### Suggesting Features

1. Check existing issues for similar suggestions
2. Use the feature request template
3. Describe:
   - The problem you're trying to solve
   - Your proposed solution
   - Alternative solutions considered
   - Use cases and examples

### Pull Requests

#### Before You Start

1. Fork the repository
2. Check existing PRs to avoid duplicate work
3. Open an issue to discuss major changes
4. Ensure your code follows our style guidelines

#### Development Process

1. **Fork and Clone**

   ```bash
   git clone git@github.com:okamitimo233/CanvasToAPI.git
   cd CanvasToAPI
   git remote add upstream git@github.com:iBUHub/CanvasToAPI.git
   ```

2. **Create Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Follow the coding standards
   - Write clear commit messages
   - Add tests for new features
   - Update documentation

4. **Test Your Changes**

   ```bash
   npm install
   npm run lint
   npm test
   ```

5. **Commit Changes**

   Follow [Conventional Commits](https://www.conventionalcommits.org/):

   ```bash
   git commit -m "feat: add new API endpoint for model switching"
   ```

   Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

6. **Push and Create PR**

   ```bash
   git push origin feature/your-feature-name
   ```

   Then create a Pull Request on GitHub.

#### PR Guidelines

- **Title**: Clear and descriptive
- **Description**: What, why, and how
- **Tests**: Include test coverage
- **Docs**: Update relevant documentation
- **Small**: One logical change per PR
- **Clean**: No merge commits or unrelated changes

#### PR Review Process

1. At least one approval required
2. All CI checks must pass
3. Resolve all review comments
4. Squash commits before merge (if requested)

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git
- Docker (optional, for containerized testing)

### Installation

```bash
# Clone your fork
git clone git@github.com:YOUR_USERNAME/CanvasToAPI.git
cd CanvasToAPI

# Add upstream remote
git remote add upstream git@github.com:iBUHub/CanvasToAPI.git

# Install dependencies
npm install

# Setup authentication
npm run setup-auth

# Start development server
npm run dev
```

### Project Structure

```
CanvasToAPI/
├── src/
│   ├── core/          # Core system components
│   ├── auth/          # Authentication modules
│   ├── utils/         # Utility functions
│   └── main.js        # Entry point
├── ui/                # Vue.js frontend
├── configs/           # Configuration files
├── test/              # Test files
└── scripts/           # Utility scripts
```

### Coding Standards

- **JavaScript**: ESLint + Prettier
- **CSS**: Stylelint + Prettier
- **Commits**: Conventional Commits
- **Branches**: GitHub Flow

Run linting:

```bash
npm run lint
npm run lint:fix     # auto-fix
npm run format       # format with Prettier
```

## Testing

### Run Tests

```bash
# All tests
npm test

# Specific test file
npm test path/to/test.js

# Coverage report
npm run test:coverage
```

### Writing Tests

- Place test files in `test/` directory
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Mock external dependencies

## Documentation

### Update Documentation

When adding features or changing behavior:

1. Update inline code comments
2. Update `README.md` if needed
3. Update `CLAUDE.md` for AI agent guidance
4. Add examples to `docs/` (if applicable)

### Documentation Style

- Use clear, simple language
- Include code examples
- Add diagrams for complex flows
- Keep it up to date

## Release Process

Maintainers handle releases:

1. Update `package.json` version
2. Update `CHANGELOG.md`
3. Create git tag: `git tag v0.0.X`
4. Push tag: `git push origin v0.0.X`
5. Create GitHub release

## Getting Help

- **Issues**: Open a GitHub issue
- **Discussions**: Use GitHub Discussions
- **Documentation**: Check `README.md` and `WORKFLOW.md`

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to CanvasToAPI! 🚀
