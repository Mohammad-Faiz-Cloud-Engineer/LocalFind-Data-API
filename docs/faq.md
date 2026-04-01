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

Yeah, go for it. It's stable.

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

## General Questions

### What is LocalFind?

LocalFind is a free, open-source REST API that provides access to local business listings. It's designed to be simple, fast, and easy to integrate into any project.

### Do I need an API key?

Nope! The API is completely open. Just start making requests.

### Are there any rate limits?

Currently, there are no rate limits. We trust you to use the API responsibly. If you're planning to make a huge number of requests, please let us know.

### Is it really free?

Yes, completely free. The project is open-source under the BSD 2-Clause License.

### Can I use this in production?

Absolutely! The API is stable and ready for production use.

## Technical Questions

### What's the base URL?

```
https://huggingface.co/spaces/LocalFind/LocalFind/api
```

### What response format does the API use?

All responses are in JSON format with a consistent structure:

```json
{
  "success": true,
  "data": [...]
}
```

### How do I handle errors?

Check the `success` field in the response. If it's `false`, the `error` field will contain the error message:

```json
{
  "success": false,
  "error": "Business not found"
}
```

### Does the API support CORS?

Yes! CORS is enabled for all origins, so you can make requests from any domain.

### Can I filter results?

Yes! You can filter by:
- `featured` - Featured businesses
- `verified` - Verified businesses
- `status` - Open or closed
- `category` - Business category
- `new` - Recently added businesses

Example:
```
/api/businesses?featured=true&status=open
```

### How does pagination work?

Use `limit` and `offset` parameters:

```
/api/businesses?limit=10&offset=0  // First 10
/api/businesses?limit=10&offset=10 // Next 10
```

### Can I sort results?

Yes! Use the `sort` parameter:
- `sort=rating` - Sort by highest rating
- `sort=name` - Sort alphabetically
- `sort=reviews` - Sort by most reviews

### What's the maximum number of results I can get?

There's no hard limit. If you don't specify a `limit`, you'll get all results. For better performance, we recommend using pagination for large datasets.

## Data Questions

### How often is the data updated?

The data is updated regularly. New businesses are added as they're submitted and verified.

### How do I know if a business is new?

Use the `new=true` filter to get businesses added within the last 7 days. Each business also has an `addedDate` field.

### What information is available for each business?

Each business includes:
- Basic info (name, category, description)
- Contact details (phone, email, website)
- Location (address, coordinates, map link)
- Ratings and reviews
- Operating hours
- Tags for easy searching
- Social media links (when available)

### Can I submit new businesses?

Currently, business submissions are handled through our GitHub repository. We're working on an automated submission system.

## Integration Questions

### Which programming languages are supported?

The API works with any language that can make HTTP requests. We have examples for:
- JavaScript/TypeScript
- Python
- PHP
- Ruby
- And more!

### Can I use this with React/Vue/Angular?

Yes! Check out our [Integration Guide](integration-guide.md) for framework-specific examples.

### Do you have a JavaScript/Python client library?

Not yet, but it's on our roadmap! For now, the API is simple enough to use with standard HTTP libraries.

### Can I cache the responses?

Yes! We recommend caching responses to improve performance. Consider caching for 5-15 minutes depending on your needs.

### How do I search for businesses?

Use the `/search` endpoint with a query parameter:

```
/api/search?q=restaurant
```

This searches across business names, descriptions, tags, and categories.

## Performance Questions

### How fast is the API?

Response times are typically under 100ms for most requests. The API is hosted on HuggingFace Spaces with good global performance.

### Can I make parallel requests?

Yes! The API can handle concurrent requests without issues.

### Should I implement caching?

For production apps, yes! Caching responses will improve your app's performance and reduce load on the API.

## Privacy & Security

### Is the data public?

Yes, all business data in the API is publicly available information.

### Do you log API requests?

We log basic request information for monitoring and debugging purposes. We don't track or store personal information about API users.

### Is the API secure?

Yes! The API is served over HTTPS, ensuring all data is encrypted in transit.

## Troubleshooting

### I'm getting a CORS error

This shouldn't happen as CORS is enabled for all origins. If you're seeing this error, make sure you're making the request from a browser and not blocking CORS in your development environment.

### The API is returning 404

Double-check your endpoint URL. Make sure you're using:
```
https://huggingface.co/spaces/LocalFind/LocalFind/api/...
```

### I'm getting empty results

Check your filters. If you're using multiple filters, make sure there are businesses that match all criteria.

### The response is slow

This could be due to:
- Network latency
- Large result sets (use pagination)
- Server load (rare)

Try using pagination and caching to improve performance.

## Contributing

### How can I contribute?

We welcome contributions! You can:
- Report bugs
- Suggest features
- Submit business data
- Improve documentation
- Contribute code

Check out our [Contributing Guide](../CONTRIBUTING.md) for details.

### I found a bug. What should I do?

Please open an issue on our [GitHub repository](https://github.com/Mohammad-Faiz-Cloud-Engineer/LocalFind-Data-API) with:
- Description of the bug
- Steps to reproduce
- Expected vs actual behavior

### Can I add my business to the database?

Yes! Please open an issue or pull request on GitHub with your business information.

## Still Have Questions?

- Check the [API Reference](api-reference.md) for detailed endpoint documentation
- Browse [examples](../examples/) for code samples
- Open an issue on [GitHub](https://github.com/Mohammad-Faiz-Cloud-Engineer/LocalFind-Data-API)

---

**Didn't find your answer?** Open an issue on GitHub and we'll help you out!
