// Utility function for handling image URLs
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/placeholder.svg';
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // For local development
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? '/uploads' 
    : 'http://localhost:5000/uploads';
    
  return `${baseUrl}/${imagePath}`;
};
