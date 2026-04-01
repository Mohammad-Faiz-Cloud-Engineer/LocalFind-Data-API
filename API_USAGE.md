# Using the LocalFind API

## The API is Live and Free to Use!

You don't need to deploy anything. Just start making requests:

```
https://huggingface.co/spaces/LocalFind/LocalFind/api
```

## Quick Start

### Get All Businesses

```bash
curl https://huggingface.co/spaces/LocalFind/LocalFind/api/businesses
```

### JavaScript Example

```javascript
fetch('https://huggingface.co/spaces/LocalFind/LocalFind/api/businesses?featured=true')
  .then(res => res.json())
  .then(data => {
    console.log(`Found ${data.total} businesses`);
    data.data.forEach(b => console.log(`${b.name} - ${b.rating}⭐`));
  });
```

### Python Example

```python
import requests

response = requests.get('https://huggingface.co/spaces/LocalFind/LocalFind/api/businesses')
data = response.json()

print(f"Found {data['total']} businesses")
for business in data['data']:
    print(f"{business['name']} - {business['rating']}⭐")
```

## Available Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/businesses` | Get all businesses with optional filters |
| `GET /api/businesses/:id` | Get specific business by ID |
| `GET /api/categories` | Get all categories |
| `GET /api/categories/:slug` | Get businesses by category |
| `GET /api/search?q=query` | Search businesses |
| `GET /api/stats` | Get API statistics |
| `GET /api/health` | Health check |

## No Authentication Required

- No API keys
- No signup
- No rate limits (use responsibly)
- No cost

## Want to Self-Host?

The API is open-source. You can deploy your own instance if you want:

1. Fork the [GitHub repository](https://github.com/Mohammad-Faiz-Cloud-Engineer/LocalFind-Data-API)
2. Deploy to HuggingFace Spaces or run locally
3. See [README.md](README.md) for deployment instructions

But the hosted version is free and always available, so you probably don't need to.

## Documentation

- [Getting Started Guide](docs/getting-started.md)
- [Complete API Reference](docs/api-reference.md)
- [FAQ](docs/faq.md)

## Support

- [GitHub Issues](https://github.com/Mohammad-Faiz-Cloud-Engineer/LocalFind-Data-API/issues)
- [Documentation](docs/README.md)

---

Built and hosted by [Mohammad Faiz](https://github.com/Mohammad-Faiz-Cloud-Engineer) • BSD 2-Clause License
