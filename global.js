console.log("V1.04");


const swup = new Swup({
    // plugins: [new SwupProgressPlugin()]
  });
  
  swup.hooks.on('page:view', () => {
    // This runs after every page change
    // example();  
  });
  
  swup.hooks.on('visit:end', () => {
    // This runs after each Swup transition completes
    console.log('Transition completed. Initializing slideshows...');
    // example();
  });

