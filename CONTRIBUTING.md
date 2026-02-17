# Contributing to Eliran's GitHub Showcase

First off, thank you for considering contributing! 🎉

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Your environment (OS, Node version, etc.)

### Suggesting Features

Feature requests are welcome! Please include:
- Use case and motivation
- Proposed solution
- Alternative solutions considered

### Pull Requests

1. **Fork the repository**
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
   - Follow existing code style
   - Add tests if applicable
   - Update documentation
4. **Commit your changes**:
   ```bash
   git commit -m "Add: your feature description"
   ```
5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request**

### Development Setup

```bash
# Clone and install
git clone https://github.com/Elirank1/monorepo.git
cd monorepo
npm install

# Run tests
npm test

# Build
npm run build
```

### Code Style

- Use TypeScript for type safety
- Follow existing formatting (check `.editorconfig`)
- Write clear commit messages
- Add comments for complex logic

### Project Structure

Each package follows its own conventions:
- **blog**: Astro + MDX, minimal dependencies
- **suno-music**: React + TypeScript, component-based
- **claude-toolkit**: Node.js + TypeScript, modular architecture

## Questions?

Feel free to open an issue or reach out:
- GitHub: [@Elirank1](https://github.com/Elirank1)
- Email: elirank512@gmail.com

Thank you for contributing! 🙏
