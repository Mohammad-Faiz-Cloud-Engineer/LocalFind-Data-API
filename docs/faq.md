# FAQ

Questions people actually ask.

## General Stuff

### What is this?

A free API for local business data. No signup, no API keys, just use it.

### Do I need an API key?

Nope.

### Are there rate limits?

Not right now. If you're planning to hammer it with millions of requests, maybe give me a heads up first.

### Is it actually free?

Yes. BSD 2-Clause license. Do whatever you want with it.

### Can I use this in production?

Yeah, go for it. The API is hosted and stable. I'm running it on HuggingFace Spaces, so it's reliable.

### Do I need to host it myself?

Nope! Just use the hosted version at `https://huggingface.co/spaces/LocalFind/LocalFind/api`. But if you want your own instance, the code is open-source and you can deploy it yourself.

## Technical Questions

### What's the base URL?

```
https://huggingface.co/spaces/LocalFind/LocalFind/api
```

### What format does it return?

JSON. Everything returns JSON.

```json
{
  "success": true,
  "data": [...]
}
```

### How do I handle errors?

Check the `success` field. If it's `false`, look at the `error` field:

```json
{
  "success": false,
  "error": "Business not found"
}
```

### Does it support CORS?

Yes. You can call it from anywhere.

### Can I filter results?

Yep:
- `featured=true` - Featured businesses
- `verified=true` - Verified ones
- `status=open` - Only open businesses
- `category=healthcare` - By category
- `new=true` - Recently added

Example:
```
/api/businesses?featured=true&status=open
```

### How does pagination work?

Use `limit` and `offset`:

```
/api/businesses?limit=10&offset=0  // First 10
/api/businesses?limit=10&offset=10 // Next 10
```

### Can I sort results?

Yes:
- `sort=rating` - Best rated first
- `sort=name` - Alphabetical
- `sort=reviews` - Most reviewed

### What's the max number of results?

There's no hard limit. If you don't specify `limit`, you get everything. For big datasets, use pagination.

## Data Questions

### How often is the data updated?

Regularly. New businesses get added as they're submitted.

### How do I know if a business is new?

Use `new=true` to get businesses added in the last 7 days. Or check the `addedDate` field.

### What info do you have for each business?

- Basic stuff (name, category, description)
- Contact (phone, email, website)
- Location (address, coordinates, map link)
- Ratings and reviews
- Hours
- Tags
- Social media (when available)

### Can I add my business?

Open an issue on GitHub with your business info. I'm working on an automated submission system.

## Integration Questions

### Which languages work?

Any language that can make HTTP requests. I have examples for JavaScript, Python, PHP, and Ruby.

### Can I use this with React/Vue/Angular?

Yes. Check the [API Reference](api-reference.md) for examples.

### Do you have a client library?

Not yet. But the API is simple enough that you don't really need one.

### Can I cache responses?

Yes, please do. It'll make your app faster. Cache for 5-15 minutes depending on your needs.

### How do I search?

Use the `/search` endpoint:

```
/api/search?q=restaurant
```

Searches names, descriptions, tags, and categories.

## Performance

### How fast is it?

Usually under 100ms.

### Can I make parallel requests?

Yes.

### Should I cache?

For production, yes. It'll improve performance.

## Privacy & Security

### Is the data public?

Yes, all business data is publicly available info.

### Do you log requests?

Basic logging for monitoring. No personal data about API users.

### Is it secure?

Yes. HTTPS everywhere.

## Troubleshooting

### I'm getting a CORS error

Shouldn't happen since CORS is enabled. Check your browser console for the actual error.

### Getting 404

Check your URL. Should be:
```
https://huggingface.co/spaces/LocalFind/LocalFind/api/...
```

### Empty results

Check your filters. Maybe nothing matches all your criteria.

### Slow response

Could be:
- Network latency
- Large result set (use pagination)
- Server load (rare)

## Contributing

### How can I help?

- Report bugs
- Suggest features
- Add business data
- Fix documentation
- Write code

See [CONTRIBUTING.md](../CONTRIBUTING.md)

### Found a bug?

Open an issue on [GitHub](https://github.com/Mohammad-Faiz-Cloud-Engineer/LocalFind-Data-API) with:
- What happened
- What you expected
- How to reproduce it

### Can I add my business?

Yes! Open an issue or PR on GitHub.

## Still Have Questions?

- [API Reference](api-reference.md) for technical details
- [GitHub Issues](https://github.com/Mohammad-Faiz-Cloud-Engineer/LocalFind-Data-API/issues) to ask

---

Didn't find your answer? Just ask on GitHub.
