/**
 * Business Listings Data
 * 
 * @author Mohammad Faiz
 * @license BSD-2-Clause
 */

const LISTINGS = require('../data.js');

/**
 * Utility function to check if a business is new (added within last 7 days)
 */
function isBusinessNew(business) {
  if (!business || typeof business !== 'object') {
    return false;
  }
  
  if (!business.addedDate) {
    return business.isNew === true;
  }
  
  if (typeof business.addedDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(business.addedDate)) {
    return business.isNew === true;
  }
  
  try {
    const addedDate = new Date(business.addedDate + 'T00:00:00Z');
    const today = new Date();
    const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
    
    if (isNaN(addedDate.getTime())) {
      return business.isNew === true;
    }
    
    const diffTime = todayUTC.getTime() - addedDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays >= 0 && diffDays <= 7;
  } catch (error) {
    return business.isNew === true;
  }
}

module.exports = {
  LISTINGS,
  isBusinessNew
};
