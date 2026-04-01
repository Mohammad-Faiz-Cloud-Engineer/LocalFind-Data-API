/**
 * API Controllers
 * 
 * @author Mohammad Faiz
 * @license BSD-2-Clause
 */

const { LISTINGS, isBusinessNew } = require('./data');

/**
 * Get all businesses with optional filters
 * Query params: featured, verified, status, category, limit, offset
 */
function getBusinesses(req, res) {
  try {
    let businesses = [...LISTINGS];
    
    // Apply filters
    if (req.query.featured === 'true') {
      businesses = businesses.filter(b => b.featured === true);
    }
    
    if (req.query.verified === 'true') {
      businesses = businesses.filter(b => b.verified === true);
    }
    
    if (req.query.status) {
      businesses = businesses.filter(b => b.status === req.query.status);
    }
    
    if (req.query.category) {
      businesses = businesses.filter(b => 
        b.categorySlug === req.query.category || 
        b.category.toLowerCase().includes(req.query.category.toLowerCase())
      );
    }
    
    if (req.query.new === 'true') {
      businesses = businesses.filter(b => isBusinessNew(b));
    }
    
    // Sorting
    if (req.query.sort === 'rating') {
      businesses.sort((a, b) => b.rating - a.rating);
    } else if (req.query.sort === 'name') {
      businesses.sort((a, b) => a.name.localeCompare(b.name));
    } else if (req.query.sort === 'reviews') {
      businesses.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    
    // Pagination - Remove limit to allow unlimited results
    const offset = parseInt(req.query.offset) || 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : businesses.length;
    const paginatedBusinesses = businesses.slice(offset, offset + limit);
    
    res.json({
      success: true,
      total: businesses.length,
      count: paginatedBusinesses.length,
      offset,
      limit,
      data: paginatedBusinesses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

/**
 * Get a specific business by ID
 */
function getBusinessById(req, res) {
  try {
    const business = LISTINGS.find(b => b.id === req.params.id);
    
    if (!business) {
      return res.status(404).json({
        success: false,
        error: 'Business not found',
        id: req.params.id
      });
    }
    
    res.json({
      success: true,
      data: business
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

/**
 * Get all available categories
 */
function getCategories(req, res) {
  try {
    const categoriesMap = new Map();
    
    LISTINGS.forEach(business => {
      if (!categoriesMap.has(business.categorySlug)) {
        categoriesMap.set(business.categorySlug, {
          name: business.category,
          slug: business.categorySlug,
          count: 0
        });
      }
      categoriesMap.get(business.categorySlug).count++;
    });
    
    const categories = Array.from(categoriesMap.values()).sort((a, b) => 
      a.name.localeCompare(b.name)
    );
    
    res.json({
      success: true,
      total: categories.length,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

/**
 * Get businesses by category slug
 */
function getBusinessesByCategory(req, res) {
  try {
    const businesses = LISTINGS.filter(b => b.categorySlug === req.params.slug);
    
    if (businesses.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Category not found or no businesses in this category',
        slug: req.params.slug
      });
    }
    
    res.json({
      success: true,
      category: businesses[0].category,
      slug: req.params.slug,
      count: businesses.length,
      data: businesses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

/**
 * Search businesses by name, tags, or description
 */
function searchBusinesses(req, res) {
  try {
    const query = req.query.q?.toLowerCase();
    
    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Search query parameter "q" is required'
      });
    }
    
    const results = LISTINGS.filter(business => {
      const nameMatch = business.name.toLowerCase().includes(query);
      const descMatch = business.description.toLowerCase().includes(query);
      const tagsMatch = business.tags?.some(tag => tag.toLowerCase().includes(query));
      const categoryMatch = business.category.toLowerCase().includes(query);
      
      return nameMatch || descMatch || tagsMatch || categoryMatch;
    });
    
    res.json({
      success: true,
      query,
      count: results.length,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

/**
 * Get API statistics
 */
function getStats(req, res) {
  try {
    const stats = {
      totalBusinesses: LISTINGS.length,
      featuredBusinesses: LISTINGS.filter(b => b.featured).length,
      verifiedBusinesses: LISTINGS.filter(b => b.verified).length,
      openBusinesses: LISTINGS.filter(b => b.status === 'open').length,
      closedBusinesses: LISTINGS.filter(b => b.status === 'closed').length,
      newBusinesses: LISTINGS.filter(b => isBusinessNew(b)).length,
      averageRating: (LISTINGS.reduce((sum, b) => sum + b.rating, 0) / LISTINGS.length).toFixed(2),
      totalReviews: LISTINGS.reduce((sum, b) => sum + b.reviewCount, 0),
      categories: new Set(LISTINGS.map(b => b.categorySlug)).size
    };
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

module.exports = {
  getBusinesses,
  getBusinessById,
  getCategories,
  getBusinessesByCategory,
  searchBusinesses,
  getStats
};
