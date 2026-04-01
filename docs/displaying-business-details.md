# Displaying Business Details on Your Webpage

This guide shows you how to display complete business information on your webpage, including all available links and contact details.

## Overview

The LocalFind API provides rich business data including multiple contact methods, social media links, and online ordering platforms. Here's how to display everything properly.

## Complete Business Data Structure

Each business object can contain the following fields:

### Basic Information
- `id` - Unique identifier
- `name` - Business name
- `category` - Category name
- `categorySlug` - URL-friendly category
- `description` - Full business description
- `rating` - Rating (0-5)
- `reviewCount` - Number of reviews
- `featured` - Featured status (boolean)
- `verified` - Verified status (boolean)
- `status` - "open" or "closed"

### Contact Information
- `phone` - Primary phone number
- `phoneName` - Label for primary phone (e.g., "Owner", "Reception")
- `phoneSecondary` - Secondary phone
- `phoneSecondaryName` - Label for secondary phone
- `phoneThird` - Third phone number
- `phoneThirdName` - Label for third phone
- `phoneFourth` - Fourth phone number
- `phoneFourthName` - Label for fourth phone
- `email` - Email address

### Location
- `address` - Full address
- `coordinates` - Object with `lat` and `lng`
- `mapLink` - Google Maps link

### Online Presence & Links
- `website` - Official website URL
- `instagram` - Instagram profile URL
- `youtube` - YouTube channel URL
- `whatsapp` - WhatsApp number
- `whatsappName` - WhatsApp contact name

### Ordering & Booking Platforms
- `onlineOrder` - Swiggy or general online ordering link
- `zomato` - Zomato ordering link
- `bookMyShow` - BookMyShow ticket booking link
- `districtIn` - District.in ticket booking link

### Special Links
- `bloodDonor` - Blood donor registration link (for healthcare)

### Business Hours
```json
"hours": {
  "mon": { "open": "09:00", "close": "18:00" },
  "tue": { "open": "09:00", "close": "18:00" },
  "wed": { "open": "09:00", "close": "18:00" },
  "thu": { "open": "09:00", "close": "18:00" },
  "fri": { "open": "09:00", "close": "18:00" },
  "sat": { "open": "10:00", "close": "16:00" },
  "sun": { "open": "00:00", "close": "00:00" }
}
```
Note: `00:00 - 00:00` means closed, `00:00 - 23:59` means 24 hours

### Additional Data
- `tags` - Array of tags
- `reviews` - Array of review objects
- `tenants` - Array of tenant business IDs (for malls/complexes)
- `upiId` - UPI payment ID
- `upiName` - UPI account name

## HTML Display Example

### Basic Business Card

```html
<div class="business-card">
  <h2 id="business-name"></h2>
  <div class="rating">
    <span id="rating"></span> ⭐
    (<span id="review-count"></span> reviews)
  </div>
  <p id="description"></p>
  
  <!-- Contact Info -->
  <div class="contact-info">
    <div id="phone-container"></div>
    <div id="email-container"></div>
    <div id="address-container"></div>
  </div>
  
  <!-- Links -->
  <div class="links" id="links-container"></div>
  
  <!-- Action Buttons -->
  <div class="actions" id="actions-container"></div>
</div>
```

### JavaScript to Display All Details

```javascript
// Helper function to check if value exists and is not empty
function hasValue(val) {
  return val !== undefined && val !== null && val !== '';
}

// Helper function to escape HTML (XSS protection)
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Fetch and display business
async function displayBusiness(businessId) {
  try {
    const response = await fetch(
      `https://huggingface.co/spaces/LocalFind/LocalFind/api/businesses/${businessId}`
    );
    const data = await response.json();
    
    if (!data.success) {
      console.error('Error:', data.error);
      return;
    }
    
    const business = data.data;
    
    // Basic Info
    document.getElementById('business-name').textContent = business.name;
    document.getElementById('rating').textContent = business.rating;
    document.getElementById('review-count').textContent = business.reviewCount;
    document.getElementById('description').textContent = business.description;
    
    // Phone Numbers
    const phoneContainer = document.getElementById('phone-container');
    let phoneHTML = `<p><strong>Phone:</strong> ${escapeHtml(business.phone)}`;
    if (business.phoneName) phoneHTML += ` (${escapeHtml(business.phoneName)})`;
    phoneHTML += '</p>';
    
    if (hasValue(business.phoneSecondary)) {
      phoneHTML += `<p><strong>Phone 2:</strong> ${escapeHtml(business.phoneSecondary)}`;
      if (business.phoneSecondaryName) phoneHTML += ` (${escapeHtml(business.phoneSecondaryName)})`;
      phoneHTML += '</p>';
    }
    
    if (hasValue(business.phoneThird)) {
      phoneHTML += `<p><strong>Phone 3:</strong> ${escapeHtml(business.phoneThird)}`;
      if (business.phoneThirdName) phoneHTML += ` (${escapeHtml(business.phoneThirdName)})`;
      phoneHTML += '</p>';
    }
    
    if (hasValue(business.phoneFourth)) {
      phoneHTML += `<p><strong>Phone 4:</strong> ${escapeHtml(business.phoneFourth)}`;
      if (business.phoneFourthName) phoneHTML += ` (${escapeHtml(business.phoneFourthName)})`;
      phoneHTML += '</p>';
    }
    
    phoneContainer.innerHTML = phoneHTML;
    
    // Email
    if (hasValue(business.email)) {
      document.getElementById('email-container').innerHTML = 
        `<p><strong>Email:</strong> ${escapeHtml(business.email)}</p>`;
    }
    
    // Address
    document.getElementById('address-container').innerHTML = 
      `<p><strong>Address:</strong> ${escapeHtml(business.address)}</p>`;
    
    // Links Section
    const linksContainer = document.getElementById('links-container');
    let linksHTML = '<h3>Links</h3><ul>';
    
    if (hasValue(business.website)) {
      linksHTML += `<li><a href="${escapeHtml(business.website)}" target="_blank" rel="noopener noreferrer">Website</a></li>`;
    }
    if (hasValue(business.instagram)) {
      linksHTML += `<li><a href="${escapeHtml(business.instagram)}" target="_blank" rel="noopener noreferrer">Instagram</a></li>`;
    }
    if (hasValue(business.youtube)) {
      linksHTML += `<li><a href="${escapeHtml(business.youtube)}" target="_blank" rel="noopener noreferrer">YouTube</a></li>`;
    }
    if (hasValue(business.mapLink)) {
      linksHTML += `<li><a href="${escapeHtml(business.mapLink)}" target="_blank" rel="noopener noreferrer">Google Maps</a></li>`;
    }
    if (hasValue(business.onlineOrder)) {
      linksHTML += `<li><a href="${escapeHtml(business.onlineOrder)}" target="_blank" rel="noopener noreferrer">Order Online</a></li>`;
    }
    if (hasValue(business.zomato)) {
      linksHTML += `<li><a href="${escapeHtml(business.zomato)}" target="_blank" rel="noopener noreferrer">Zomato</a></li>`;
    }
    if (hasValue(business.bookMyShow)) {
      linksHTML += `<li><a href="${escapeHtml(business.bookMyShow)}" target="_blank" rel="noopener noreferrer">BookMyShow</a></li>`;
    }
    if (hasValue(business.districtIn)) {
      linksHTML += `<li><a href="${escapeHtml(business.districtIn)}" target="_blank" rel="noopener noreferrer">District.in</a></li>`;
    }
    if (hasValue(business.bloodDonor)) {
      linksHTML += `<li><a href="${escapeHtml(business.bloodDonor)}" target="_blank" rel="noopener noreferrer">Blood Donor Registration</a></li>`;
    }
    
    linksHTML += '</ul>';
    linksContainer.innerHTML = linksHTML;
    
    // Action Buttons
    const actionsContainer = document.getElementById('actions-container');
    let actionsHTML = '';
    
    if (hasValue(business.phone)) {
      actionsHTML += `<a href="tel:${escapeHtml(business.phone)}" class="btn btn-primary">Call Now</a> `;
    }
    if (hasValue(business.whatsapp)) {
      const whatsappNumber = business.whatsapp.replace(/[^0-9]/g, '');
      actionsHTML += `<a href="https://wa.me/${whatsappNumber}" target="_blank" rel="noopener noreferrer" class="btn btn-success">WhatsApp</a> `;
    }
    if (hasValue(business.mapLink)) {
      actionsHTML += `<a href="${escapeHtml(business.mapLink)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Get Directions</a> `;
    }
    
    actionsContainer.innerHTML = actionsHTML;
    
    // Business Hours (if available)
    if (business.hours) {
      displayBusinessHours(business.hours);
    }
    
    // Tags (if available)
    if (business.tags && business.tags.length > 0) {
      displayTags(business.tags);
    }
    
  } catch (error) {
    console.error('Error fetching business:', error);
  }
}

// Display business hours
function displayBusinessHours(hours) {
  const daysMap = {
    mon: 'Monday',
    tue: 'Tuesday',
    wed: 'Wednesday',
    thu: 'Thursday',
    fri: 'Friday',
    sat: 'Saturday',
    sun: 'Sunday'
  };
  
  let hoursHTML = '<h3>Business Hours</h3><ul>';
  
  for (const [day, times] of Object.entries(hours)) {
    const dayName = daysMap[day] || day;
    let timeStr;
    
    if (times.open === '00:00' && times.close === '00:00') {
      timeStr = 'Closed';
    } else if (times.open === '00:00' && times.close === '23:59') {
      timeStr = '24 Hours';
    } else {
      timeStr = `${times.open} - ${times.close}`;
    }
    
    hoursHTML += `<li><strong>${dayName}:</strong> ${timeStr}</li>`;
  }
  
  hoursHTML += '</ul>';
  document.body.insertAdjacentHTML('beforeend', hoursHTML);
}

// Display tags
function displayTags(tags) {
  let tagsHTML = '<div class="tags"><h3>Tags</h3>';
  tags.forEach(tag => {
    tagsHTML += `<span class="tag">${escapeHtml(tag)}</span> `;
  });
  tagsHTML += '</div>';
  document.body.insertAdjacentHTML('beforeend', tagsHTML);
}

// Usage
displayBusiness('your-business-id');
```

## Important Security Notes

### Always Escape User-Generated Content

Never insert business data directly into HTML without escaping. This prevents XSS attacks:

```javascript
// ❌ WRONG - Vulnerable to XSS
element.innerHTML = business.name;

// ✅ CORRECT - Safe
element.textContent = business.name;
// OR
element.innerHTML = escapeHtml(business.name);
```

### Validate URLs Before Using

```javascript
function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

// Use it
if (hasValue(business.website) && isValidUrl(business.website)) {
  // Display the link
}
```

## Handling Empty Fields

Not all businesses have all fields. Always check before displaying:

```javascript
// ❌ WRONG - Will show "undefined" or break
<p>Website: ${business.website}</p>

// ✅ CORRECT - Only show if exists
${hasValue(business.website) ? 
  `<p>Website: <a href="${escapeHtml(business.website)}">${escapeHtml(business.website)}</a></p>` 
  : ''}
```

## Responsive Design Tips

### Mobile-First Contact Buttons

```html
<!-- On mobile, these become tappable -->
<a href="tel:+919876543210" class="btn">Call</a>
<a href="https://wa.me/919876543210" class="btn">WhatsApp</a>
<a href="mailto:email@example.com" class="btn">Email</a>
```

### Collapsible Sections

For businesses with lots of information, use collapsible sections:

```html
<details>
  <summary>Contact Information</summary>
  <div class="contact-details">
    <!-- All contact info here -->
  </div>
</details>

<details>
  <summary>Business Hours</summary>
  <div class="hours-details">
    <!-- Hours here -->
  </div>
</details>
```

## Complete Working Example

Check out `localfind_Test.html` in the repository root for a complete, production-ready example that displays all business details with:

- ✅ XSS protection
- ✅ All link types supported
- ✅ Responsive design
- ✅ Proper error handling
- ✅ Loading states
- ✅ Empty field handling
- ✅ Brand-colored action buttons

## Link Types Reference

| Field | Description | Example Use Case |
|-------|-------------|------------------|
| `website` | Official website | Any business |
| `instagram` | Instagram profile | Retail, restaurants, services |
| `youtube` | YouTube channel | Businesses with video content |
| `whatsapp` | WhatsApp number | Direct messaging |
| `mapLink` | Google Maps link | Navigation |
| `onlineOrder` | Swiggy/delivery link | Restaurants, food delivery |
| `zomato` | Zomato ordering | Restaurants |
| `bookMyShow` | Movie tickets | Cinemas, theaters |
| `districtIn` | Movie tickets | Cinemas, theaters |
| `bloodDonor` | Blood donor registry | Healthcare, hospitals |

## Best Practices

1. **Always check for empty strings** - Use `hasValue()` helper
2. **Escape all user content** - Prevent XSS attacks
3. **Use semantic HTML** - Better accessibility
4. **Add loading states** - Better UX while fetching
5. **Handle errors gracefully** - Show user-friendly messages
6. **Test on mobile** - Most users will be on mobile
7. **Add rel="noopener noreferrer"** - Security for external links
8. **Use appropriate icons** - Font Awesome or similar
9. **Group related information** - Contact, location, links, etc.
10. **Make phone numbers tappable** - Use `tel:` links

## Need Help?

- Check the [API Reference](api-reference.md) for all available fields
- See [FAQ](faq.md) for common questions
- Open an issue on [GitHub](https://github.com/Mohammad-Faiz-Cloud-Engineer/LocalFind-Data-API)

---

**Next:** [API Reference](api-reference.md) | [Back to Getting Started](getting-started.md)
