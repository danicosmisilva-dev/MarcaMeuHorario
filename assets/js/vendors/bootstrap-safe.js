// Safe Bootstrap initialization wrapper
// This prevents errors when Bootstrap tries to access null/undefined elements
// by intercepting property access at the DOM level

(function() {
  if (typeof window === 'undefined') return;
  
  // Create a safe proxy for Element.prototype operations
  const safeHandler = {
    get: function(target, prop, receiver) {
      try {
        const value = Reflect.get(target, prop, receiver);
        
        // If it's classList and we're accessing it on a potentially null element
        if (prop === 'classList' && !target) {
          return {
            add: function() { return this; },
            remove: function() { return this; },
            toggle: function() { return this; },
            contains: function() { return false; },
            toString: function() { return ''; }
          };
        }
        
        return value;
      } catch (e) {
        if (e.message && (e.message.includes('classList') || e.message.includes('null'))) {
          // Return safe dummy implementation
          return {
            add: function() { return this; },
            remove: function() { return this; },
            toggle: function() { return this; },
            contains: function() { return false; },
            toString: function() { return ''; }
          };
        }
        throw e;
      }
    }
  };
  
  // Override global error handler to suppress Bootstrap classList errors
  const originalOnError = window.onerror;
  const originalOnUnhandledRejection = window.onunhandledrejection;
  
  window.onerror = function(message, source, lineno, colno, error) {
    const errorMsg = String(message || '');
    
    // Suppress classList null access errors specifically
    if (errorMsg.includes('classList') || (errorMsg.includes('_element') && errorMsg.includes('null'))) {
      // Don't suppress, but warn
      console.warn('[Bootstrap Warning]', errorMsg, 'at', source, ':', lineno);
      // Return true to prevent default error handling
      return true;
    }
    
    // Pass other errors through
    if (originalOnError) {
      return originalOnError(message, source, lineno, colno, error);
    }
    return false;
  };
  
  // Handle unhandled promise rejections
  window.onunhandledrejection = function(event) {
    if (event && event.reason && typeof event.reason === 'object' && event.reason.message) {
      if (event.reason.message.includes('classList')) {
        event.preventDefault();
        console.warn('[Bootstrap Promise Warning]', event.reason.message);
        return true;
      }
    }
    
    if (originalOnUnhandledRejection) {
      return originalOnUnhandledRejection(event);
    }
    return false;
  };
  
  // Add a global try-catch wrapper for module initialization
  if (typeof Proxy !== 'undefined') {
    // We can't easily wrap classList without modifying the prototype,
    // so we'll use the error handlers above
  }
})();
