export const mockSummarizeAPI = (text, length) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
    
        const summaries = {
          short: "This is a short summary.",
          medium: "This is a medium summary with more details.",
          long: "This is a long summary that includes even more details to provide a comprehensive overview."
        };
  
        
        if (text && summaries[length]) {
          resolve(summaries[length]);
        } else {
          reject("Error: Invalid input or length.");
        }
        
      }, 1000); 
    });
  };
  