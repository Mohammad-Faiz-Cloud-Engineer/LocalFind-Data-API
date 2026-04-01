# LocalFind API Docs

Hey! This is the documentation for LocalFind, a free API for local business data.

## What Is This?

It's an API that gives you business listings. No signup, no API keys, no payment. Just make a request and get data back.

I built it because I needed something like this and everything else either cost money or was a pain to use.

## The API is Live!

You don't need to deploy anything. I'm hosting it for free on HuggingFace Spaces:

```
https://huggingface.co/spaces/LocalFind/LocalFind/api
```

Just start using it. If you want to self-host your own instance, the code is open-source and you can deploy it yourself (see the main [README](../README.md)).

## Start Here

- **[Getting Started](getting-started.md)** - Make your first API call in 5 minutes
- **[API Reference](api-reference.md)** - All the endpoints and what they do
- **[FAQ](faq.md)** - Questions people keep asking

## Quick Example

```javascript
fetch('https://huggingface.co/spaces/LocalFind/LocalFind/api/businesses?featured=true')
  .then(res => res.json())
  .then(data => console.log(data));
```

That's it. No API key, no OAuth, no nothing.

## What Can You Build?

Whatever you want. Some ideas:

- A business directory for your city
- A "find nearby" feature
- A review site
- An analytics dashboard
- Something I haven't thought of

## Need Help?

- Check the [FAQ](faq.md)
- Open an issue on [GitHub](https://github.com/Mohammad-Faiz-Cloud-Engineer/LocalFind-Data-API)

## Want to Contribute?

Cool! See [CONTRIBUTING.md](../CONTRIBUTING.md)

---

**Ready?** → [Getting Started](getting-started.md)
