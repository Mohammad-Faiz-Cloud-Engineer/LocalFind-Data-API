# Contributing to LocalFind

Thanks for your interest in making LocalFind better! Whether you're fixing a typo or adding a major feature, we appreciate your help.

## Quick Start

1. Fork the repo
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/LocalFind-Data-API.git`
3. Create a branch: `git checkout -b fix/your-fix-name`
4. Make your changes
5. Test everything works
6. Commit: `git commit -m "Fix: description of what you fixed"`
7. Push: `git push origin fix/your-fix-name`
8. Open a Pull Request

## Ways to Contribute

### Report Bugs

Found something broken? Let us know! Open an issue with:

- What you were trying to do
- What happened instead
- Steps to reproduce it
- Your environment (OS, Node version, browser)

### Suggest Features

Have an idea? We'd love to hear it! Open an issue describing:

- What problem it solves
- How it would work
- Why it would be useful

### Fix Bugs

Check out issues labeled `bug` or `good first issue`. These are great starting points.

### Add Business Data

Want to add a business? Great! You can:

1. Open an issue with the business details
2. Or submit a PR adding it to `data.js`

Make sure to include all required fields:

```javascript
{
  id: "unique-business-id",
  name: "Business Name",
  category: "Category Name",
  categorySlug: "category-slug",
  featured: false,
  verified: false,
  status: "open",
  rating: 0,
  reviewCount: 0,
  coordinates: { lat: 0, lng: 0 },
  address: "Full Address",
  mapLink: "Google Maps Link",
  phone: "+91 XXXXX XXXXX",
  email: "email@example.com",
  description: "Business description",
  tags: ["tag1", "tag2"],
  addedDate: "YYYY-MM-DD"
}
```

### Improve Documentation

Documentation can always be better! Feel free to:

- Fix typos
- Clarify confusing parts
- Add more examples
- Translate to other languages

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/LocalFind-Data-API.git
cd LocalFind-Data-API

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test
```

## Code Style

We keep it simple:

- Use meaningful variable names
- Add comments for complex logic (explain WHY, not WHAT)
- Keep functions small and focused
- Use ES6+ features
- Follow the existing code style

### Good Example

```javascript
async function getBusinessById(req, res) {
  try {
    const business = LISTINGS.find(b => b.id === req.params.id);
    
    if (!business) {
      return res.status(404).json({
        success: false,
        error: 'Business not found'
      });
    }
    
    res.json({ success: true, data: business });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
```

## Commit Messages

Keep them clear and descriptive:

- `Fix: Search not working with special characters`
- `Add: Health check endpoint`
- `Update: API documentation for new filters`
- `Remove: Unused dependencies`

## Pull Request Process

1. Make sure your code works
2. Update documentation if needed
3. Add examples for new features
4. Run the tests: `npm test`
5. Create a PR with a clear description

### PR Template

```markdown
## What does this PR do?
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## How to Test
Steps to test the changes

## Checklist
- [ ] Code works
- [ ] Tests pass
- [ ] Documentation updated
- [ ] Examples added (if needed)
```

## Testing

Before submitting, make sure:

```bash
# All tests pass
npm test

# Server starts without errors
npm start

# Try a few API calls
curl http://localhost:3000/api/businesses
curl http://localhost:3000/api/search?q=test
```

## Questions?

Not sure about something? Just ask! Open an issue or reach out on GitHub.

## Code of Conduct

Be nice. That's it. We're all here to build something useful together.

---

**Thanks for contributing!** Every bit helps make LocalFind better for everyone.
