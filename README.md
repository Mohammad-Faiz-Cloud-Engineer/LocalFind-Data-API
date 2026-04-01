---
title: LocalFind Data API
emoji: 🗺️
colorFrom: blue
colorTo: green
sdk: docker
app_port: 3000
---

# LocalFind Data API

Free local business data API. No signup, no API keys, no BS.

Made by [Mohammad Faiz](https://github.com/Mohammad-Faiz-Cloud-Engineer) • [BSD 2-Clause License](LICENSE)

---

## What's This?

I got tired of hunting for decent local business data APIs that either wanted money or made you jump through authentication hoops. So I built this and I'm hosting it for free.

It's simple: you make a request, you get business data. That's it.

## Try It Right Now

The API is live and ready to use. Seriously, just click this:
```
https://huggingface.co/spaces/LocalFind/LocalFind/api/businesses
```

Or paste this in your console:

```javascript
fetch('https://huggingface.co/spaces/LocalFind/LocalFind/api/businesses?featured=true')
  .then(res => res.json())
  .then(data => console.log(data));
```

No account creation, no API key dance, no credit card "just for verification." It just works.

## Use My Hosted API (Recommended)

I'm hosting this API for free on HuggingFace Spaces. Just use it directly:

**Base URL:** `https://huggingface.co/spaces/LocalFind/LocalFind/api`

You don't need to deploy anything. Just start making requests.

## Want to Self-Host? (Optional)

The API is already hosted and free to use, but if you want your own instance:

### Deploy to HuggingFace Spaces

1. Fork this repository on GitHub
2. Go to [HuggingFace Spaces](https://huggingface.co/spaces)
3. Click "Create new Space"
4. Choose "Docker" as SDK
5. Connect your forked repository
6. Wait for it to build and deploy

Your own instance will be live at:
```
https://huggingface.co/spaces/YOUR_USERNAME/YOUR_SPACE_NAME/api
```

(Replace YOUR_USERNAME and YOUR_SPACE_NAME with your actual HuggingFace username and space name)

### Run Locally

```bash
git clone https://github.com/Mohammad-Faiz-Cloud-Engineer/LocalFind-Data-API.git
cd LocalFind-Data-API
npm install
npm start
```

Or with Docker:

```bash
docker build -t localfind-api .
docker run -p 3000:3000 localfind-api
```

## What Can You Do With This?

Build whatever you want. Some ideas:

- A local business directory for your town
- A "find nearby" feature for your app
- A review aggregator
- Some kind of analytics thing
- A recommendation engine
- Honestly, I don't know, surprise me

## How It Works

Base URL: `https://huggingface.co/spaces/LocalFind/LocalFind/api`

**Get all businesses:**
```
GET /businesses
```

**Filter them:**
```bash
/businesses?featured=true          # Just the good ones
/businesses?category=healthcare    # By category
/businesses?sort=rating            # Highest rated first
/businesses?limit=10&offset=0      # Paginate if you want
```

**You get back:**
```json
{
  "success": true,
  "total": 50,
  "data": [
    {
      "id": "some-business",
      "name": "Business Name",
      "rating": 4.5,
      "phone": "+91 XXXXX XXXXX",
      "address": "123 Main St"
    }
  ]
}
```

**Other stuff you can do:**
- `GET /businesses/:id` - Get one specific business
- `GET /categories` - See all categories
- `GET /categories/:slug` - Businesses in a category
- `GET /search?q=hospital` - Search for anything
- `GET /stats` - Some numbers about the data

Full docs: [docs/api-reference.md](docs/api-reference.md)

## Code Examples

**JavaScript:**

```javascript
const API_URL = 'https://huggingface.co/spaces/LocalFind/LocalFind/api';

const response = await fetch(`${API_URL}/businesses?featured=true`);
const data = await response.json();

data.data.forEach(business => {
  console.log(`${business.name} - ${business.rating}⭐`);
});
```

**Python:**

```python
import requests

API_URL = 'https://huggingface.co/spaces/LocalFind/LocalFind/api'

r = requests.get(f'{API_URL}/businesses?featured=true')
businesses = r.json()['data']

for b in businesses:
    print(f"{b['name']} - {b['rating']}⭐")
```

**React:**

```jsx
function BusinessList() {
  const [businesses, setBusinesses] = useState([]);
  const API_URL = 'https://huggingface.co/spaces/LocalFind/LocalFind/api';
  
  useEffect(() => {
    fetch(`${API_URL}/businesses?featured=true`)
      .then(res => res.json())
      .then(data => setBusinesses(data.data));
  }, []);
  
  return (
    <div>
      {businesses.map(b => (
        <div key={b.id}>
          <h3>{b.name}</h3>
          <p>{b.description}</p>
        </div>
      ))}
    </div>
  );
}
```

More examples for Vue, Angular, Next.js, etc: [docs/api-reference.md](docs/api-reference.md)

- **[Getting Started](docs/getting-started.md)** - First API call in 5 minutes
- **[API Reference](docs/api-reference.md)** - All the endpoints
- **[FAQ](docs/faq.md)** - Questions people actually ask

## What You Get

Each business has:

```json
{
  "id": "unique-id",
  "name": "Business Name",
  "category": "Healthcare",
  "rating": 4.5,
  "reviewCount": 10,
  "address": "Full address",
  "phone": "+91 XXXXX XXXXX",
  "email": "email@example.com",
  "coordinates": { "lat": 26.92, "lng": 81.26 },
  "hours": { "mon": { "open": "09:00", "close": "18:00" } },
  "description": "What they do",
  "tags": ["tag1", "tag2"]
}
```

Plus some other stuff like website, WhatsApp, Instagram, etc.

## Want to Help?

Cool! You can:

- Report bugs
- Suggest features
- Add more business data
- Fix documentation

Open an issue on [GitHub](https://github.com/Mohammad-Faiz-Cloud-Engineer/LocalFind-Data-API/issues)

## License

BSD 2-Clause - do whatever you want with it.

## Questions?

- [Documentation](docs/README.md)
- [GitHub Issues](https://github.com/Mohammad-Faiz-Cloud-Engineer/LocalFind-Data-API/issues)

---

Built by [Mohammad Faiz](https://github.com/Mohammad-Faiz-Cloud-Engineer) because I needed this and figured you might too.
