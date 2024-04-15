<script src="https://unpkg.com/swup@4"></script>

const swup = new Swup({
    plugins: [new SwupProgressPlugin()]
  });
  
  swup.hooks.on('page:view', () => {
    // This runs after every page change
  
    example();  
  });
  
  swup.hooks.on('visit:end', () => {
    // This runs after each Swup transition completes
    console.log('Transition completed. Initializing slideshows...');
    example();
  });

  console.log('This is a test')