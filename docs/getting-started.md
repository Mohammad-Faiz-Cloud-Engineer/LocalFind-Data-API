# Getting Started

Let's get you making API calls in the next 5 minutes.

## The Fastest Way

Just open this link in your browser:

👉 [https://huggingface.co/spaces/LocalFind/LocalFind/api/businesses](https://huggingface.co/spaces/LocalFind/LocalFind/api/businesses)

You'll see JSON. That's the API working. You're done.

## Using It In Your Code

### JavaScript

```javascript
fetch('https://huggingface.co/spaces/LocalFind/LocalFind/api/businesses')
  .then(res => res.json())
  .then(data => {
    console.log(`Found ${data.total} businesses`);
    data.data.forEach(b => console.log(`${b.name} - ${b.rating}⭐`));
  });
```

### Python

```python
import requests

r = requests.get('https://huggingface.co/spaces/LocalFind/LocalFind/api/businesses')
data = r.json()

print(f"Found {data['total']} businesses")
for b in data['data']:
    print(f"{b['name']} - {b['rating']}⭐")
```

### cURL

```bash
curl https://huggingface.co/spaces/LocalFind/LocalFind/api/businesses
```

That's literally it. No API keys, no OAuth dance, no "verify your email."

## Common Stuff You'll Want To Do

### Get Only The Good Businesses

```javascript
fetch('https://huggingface.co/spaces/LocalFind/LocalFind/api/businesses?featured=true')
```

### Search For Something

```javascript
fetch('https://huggingface.co/spaces/LocalFind/LocalFind/api/search?q=restaurant')
```

### Get One Specific Business

```javascript
fetch('https://huggingface.co/spaces/LocalFind/LocalFind/api/businesses/raheem-common-service-center')
```

### See All Categories

```javascript
fetch('https://huggingface.co/spaces/LocalFind/LocalFind/api/categories')
```

## What You Get Back

Every successful response looks like this:

```json
{
  "success": true,
  "total": 50,
  "count": 10,
  "data": [...]
}
```

- `success` - Did it work? (true/false)
- `total` - How many results exist total
- `count` - How many you got in this response
- `data` - The actual stuff you asked for

## What's In A Business?

```json
{
  "id": "unique-id",
  "name": "Business Name",
  "category": "Healthcare",
  "rating": 4.5,
  "reviewCount": 10,
  "address": "Full address here",
  "phone": "+91 XXXXX XXXXX",
  "email": "email@example.com",
  "description": "What they do",
  "tags": ["tag1", "tag2"],
  "coordinates": {
    "lat": 26.9230,
    "lng": 81.2608
  }
}
```

Plus some other stuff like website, WhatsApp, Instagram, hours, etc.

## Filtering

You can filter results with query parameters:

```javascript
// Featured AND verified businesses
fetch('...api/businesses?featured=true&verified=true')

// By category
fetch('...api/businesses?category=healthcare')

// Only open businesses
fetch('...api/businesses?status=open')
```

## Sorting

```javascript
// Best rated first
fetch('...api/businesses?sort=rating')

// Alphabetical
fetch('...api/businesses?sort=name')

// Most reviewed
fetch('...api/businesses?sort=reviews')
```

## Pagination

```javascript
// First 10
fetch('...api/businesses?limit=10&offset=0')

// Next 10
fetch('...api/businesses?limit=10&offset=10')
```

## Handling Errors

Always check for errors:

```javascript
try {
  const res = await fetch('https://huggingface.co/spaces/LocalFind/LocalFind/api/businesses');
  const data = await res.json();
  
  if (!data.success) {
    console.error('API Error:', data.error);
    return;
  }
  
  // Use the data
  console.log(data.data);
} catch (error) {
  console.error('Network Error:', error);
}
```

## What's Next?

- [API Reference](api-reference.md) - All the endpoints and options
- [FAQ](faq.md) - Common questions

## Need Help?

- Check the [FAQ](faq.md)
- Open an issue on [GitHub](https://github.com/Mohammad-Faiz-Cloud-Engineer/LocalFind-Data-API)

---

That's it. Go build something cool.
