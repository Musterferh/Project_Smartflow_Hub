declare module '*.css' {
  const styles: { [className: string]: string };
  export default styles;
}

// Allow side-effect imports of global CSS files
declare module '@/styles/globals.css' {
  const content: never;
  export default content;
}
