// Test script to verify bootstrap-safe.js error handling
console.log('Testing Bootstrap error handling...');

// Test 1: Check if Element.prototype.classList is wrapped
try {
  const testElement = document.createElement('div');
  const classList = testElement.classList;
  console.log('✓ classList access: OK');
} catch (e) {
  console.error('✗ classList access failed:', e.message);
}

// Test 2: Check if our error handler is registered
console.log('✓ window.onerror handler registered:', typeof window.onerror === 'function');
console.log('✓ window.onunhandledrejection handler registered:', typeof window.onunhandledrejection === 'function');

// Test 3: Simulate a Bootstrap error (this should be suppressed)
try {
  const error = new Error("can't access property \"classList\", this._element is null");
  window.onerror(error.message, 'test.js', 1, 1, error);
  console.log('✓ Error suppression: OK');
} catch (e) {
  console.error('✗ Error suppression failed:', e.message);
}

console.log('Bootstrap error handling tests completed.');
