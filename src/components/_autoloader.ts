// Globally register all base components for convenience, because they
// will be used very frequently. Components are registered using the
// PascalCased version of their file name.

import Vue from 'vue';

// https://webpack.js.org/guides/dependency-management/#require-context
// @ts-ignore
const requireComponent = require.context(
  // Look for files in the current directory
  '.',
  // Look in subdirectories
  true
);

// For each matching file name...
requireComponent.keys().forEach(fileName => {
  // Get the component config
  const componentConfig = requireComponent(fileName);

  // Get the PascalCase version of the component name
  const componentName = fileName
    // Split the fileName by /
    .split('/')
    // Get the last string
    .pop()
    // Remove the "./_" from the beginning
    .replace(/^\.\/_/, '')
    // Remove the file extension from the end
    .replace(/\.\w+$/, '')
    // Split up kebabs
    .split('-')
    // Upper case
    .map(kebab => kebab.charAt(0).toUpperCase() + kebab.slice(1))
    // Concatenated
    .join('');

  if (componentName === '_autoloader') {
    return;
  }

  // Globally register the component
  Vue.component(componentName, componentConfig.default || componentConfig);
});
