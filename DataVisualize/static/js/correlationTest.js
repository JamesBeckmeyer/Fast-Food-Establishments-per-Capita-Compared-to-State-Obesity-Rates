
let { tTest, pcorrtest } = require('@stdlib/stats-pcorrtest');

// Sample data for obesity prevalence
let obesityPrevalence = [39.9, 33.5, 31.3, 38.7, 27.6, 25.1, 30.4, 33.9, 24.7, 33.9, 33.5, 25, 31.6, 34.2, 36.3, 
                         36.4, 36, 40.3, 38.6, 31.9, 34.3, 27.4, 34.4, 32.4, 39.1, 37.3, 31.8, 35.9, 31.3, 30.6, 
                         28.2, 34.6, 29.1, 36, 35.2, 37.8, 39.4, 30.4, 33.3, 36, 30.1, 36.1, 38.4, 35, 36.1, 30.9, 
                         29, 35.6, 34.2, 28.8, 40.6, 33.9, 32];

// Sample data for fast food restaurants
let fastFoodCount = [81.7, 61.9, 67.9, 69.9, 82.3, 75.7, 76.1, 78.3, 82.5, 97.5, 65.5, 82.5, 73.7, 67.7, 74.7, 
                     74.2, 76.2, 74.9, 89.7, 77.5, 73.9, 67, 77.3, 72.9, 69.8, 71.9, 84.8, 79.8, 81.2, 73.4, 92.3, 
                     76.9, 65.6, 82.8, 76, 73.4, 75.5, 81.3, 73.5, 63.9, 77.8, 75.8, 76.2, 68.3, 80.1, 66.8, 73.8, 
                     65, 62.5];


// Correlation
let correlationResult = pcorrtest(obesityPrevalence, fastFoodCount);
        console.log('Correlation Result:');
        console.log('Correlation Coefficient:', correlationResult.correlation);
        console.log('p-value:', correlationResult.pValue);




