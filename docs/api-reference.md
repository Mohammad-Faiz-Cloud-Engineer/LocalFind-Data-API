# API Reference

Complete reference for all LocalFind API endpoints.

## Base URL

```
https://huggingface.co/spaces/LocalFind/LocalFind/api
```

## Endpoints Overview

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/businesses` | GET | Get all businesses with filters |
| `/businesses/:id` | GET | Get specific business by ID |
| `/categories` | GET | Get all categories |
| `/categories/:slug` | GET | Get businesses by category |
| `/search` | GET | Search businesses |
| `/stats` | GET | Get API statistics |
| `/health` | GET | Health check |

---

## GET /businesses

Get all businesses with optional filtering, sorting, and pagination.

### Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `featured` | boolean | Filter featured businesses | `?featured=true` |
| `verified` | boolean | Filter verified businesses | `?verified=true` |
| `status` | string | Filter by status (open/closed) | `?status=open` |
| `category` | string | Filter by category slug | `?category=healthcare` |
| `new` | boolean | Filter new businesses (≤7 days) | `?new=true` |
| `sort` | string | Sort by: rating, name, reviews | `?sort=rating` |
| `limit` | number | Limit results (no limit by default) | `?limit=10` |
| `offset` | number | Pagination offset | `?offset=20` |

### Example Request

```bash
GET /api/businesses?featured=true&sort=rating&limit=5
```

### Example Response

```json
{
  "success": true,
  "total": 50,
  "count": 5,
  "offset": 0,
  "limit": 5,
  "data": [
    {
      "id": "raheem-common-service-center",
      "name": "Raheem CSC",
      "category": "Government Services & CSC",
      "categorySlug": "government-services",
      "featured": true,
      "verified": true,
      "status": "open",
      "rating": 5.0,
      "reviewCount": 1,
      "coordinates": {
        "lat": 26.9230278,
        "lng": 81.2608333
      },
      "address": "Village & Post Rasauli...",
      "phone": "+91 91405 15707",
      "email": "moraheem862@gmail.com",
      "description": "Raheem CSC is your one-stop solution...",
      "tags": ["csc", "aadhaar", "pan-card"],
      "hours": {
        "mon": {"open": "09:00", "close": "19:00"},
        "tue": {"open": "09:00", "close": "19:00"}
      }
    }
  ]
}
```

---

## GET /businesses/:id

Get a specific business by its unique ID.

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Unique business identifier |

### Example Request

```bash
GET /api/businesses/raheem-common-service-center
```

### Example Response

```json
{
  "success": true,
  "data": {
    "id": "raheem-common-service-center",
    "name": "Raheem CSC",
    ...
  }
}
```

### Error Response (404)

```json
{
  "success": false,
  "error": "Business not found",
  "id": "invalid-id"
}
```

---

## GET /categories

Get all available business categories with counts.

### Example Request

```bash
GET /api/categories
```

### Example Response

```json
{
  "success": true,
  "total": 15,
  "data": [
    {
      "name": "Fashion & Apparel",
      "slug": "fashion",
      "count": 5
    },
    {
      "name": "Healthcare & Pharmacy",
      "slug": "healthcare",
      "count": 8
    }
  ]
}
```

---

## GET /categories/:slug

Get all businesses in a specific category.

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `slug` | string | Category slug identifier |

### Example Request

```bash
GET /api/categories/healthcare
```

### Example Response

```json
{
  "success": true,
  "category": "Healthcare & Pharmacy",
  "slug": "healthcare",
  "count": 8,
  "data": [...]
}
```

### Error Response (404)

```json
{
  "success": false,
  "error": "Category not found or no businesses in this category",
  "slug": "invalid-slug"
}
```

---

## GET /search

Search businesses by name, description, tags, or category.

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | Yes | Search query |

### Example Request

```bash
GET /api/search?q=hospital
```

### Example Response

```json
{
  "success": true,
  "query": "hospital",
  "count": 3,
  "data": [
    {
      "id": "abdul-hospital",
      "name": "Abdul Hospital",
      ...
    }
  ]
}
```

### Error Response (400)

```json
{
  "success": false,
  "error": "Search query parameter \"q\" is required"
}
```

---

## GET /stats

Get API statistics and aggregated data.

### Example Request

```bash
GET /api/stats
```

### Example Response

```json
{
  "success": true,
  "data": {
    "totalBusinesses": 50,
    "featuredBusinesses": 20,
    "verifiedBusinesses": 18,
    "openBusinesses": 48,
    "closedBusinesses": 2,
    "newBusinesses": 5,
    "averageRating": "4.35",
    "totalReviews": 150,
    "categories": 15
  }
}
```

---

## GET /health

Health check endpoint for monitoring.

### Example Request

```bash
GET /api/health
```

### Example Response

```json
{
  "status": "healthy",
  "timestamp": "2026-04-01T12:00:00.000Z",
  "uptime": 3600
}
```

---

## Response Format

All API responses follow a consistent format:

### Success Response

```json
{
  "success": true,
  "data": {...} or [...]
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message"
}
```

### Paginated Response

```json
{
  "success": true,
  "total": 100,
  "count": 10,
  "offset": 0,
  "limit": 10,
  "data": [...]
}
```

---

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid parameters |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

---

## Business Object Schema

```typescript
interface Business {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  featured: boolean;
  verified?: boolean;
  status: 'open' | 'closed';
  rating: number;
  reviewCount: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  reviews?: Review[];
  address: string;
  mapLink: string;
  phone: string;
  phoneName?: string;
  email?: string;
  website?: string;
  whatsapp?: string;
  instagram?: string;
  hours: {
    mon: { open: string; close: string };
    tue: { open: string; close: string };
    wed: { open: string; close: string };
    thu: { open: string; close: string };
    fri: { open: string; close: string };
    sat: { open: string; close: string };
    sun: { open: string; close: string };
  };
  description: string;
  tags: string[];
  upiId?: string;
  addedDate: string;
}
```

---

## Rate Limiting

Currently, there are no rate limits. Use responsibly!

## CORS

CORS is enabled for all origins. You can make requests from any domain.

---

**Need examples?** Check out the [Integration Guide](integration-guide.md) →
