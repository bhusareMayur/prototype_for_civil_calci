import React, { useState } from 'react';
import { Calculator, RefreshCw } from 'lucide-react';
import MaterialCalculator from './components/MaterialCalculator';
import Results from './components/Results';
import { CalculationResult } from './types';

function App() {
  const [results, setResults] = useState<CalculationResult | null>(null);

  const handleCalculation = (result: CalculationResult) => {
    setResults(result);
  };

  const handleReset = () => {
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 flex items-center justify-center">
          <Calculator className="mr-2" />
          Building Materials Calculator
        </h1>
        {results ? (
          <Results results={results} onReset={handleReset} />
        ) : (
          <MaterialCalculator onCalculate={handleCalculation} />
        )}
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>© 2024 Building Materials Calculator. All rights reserved.</p>
          <p className="mt-2 flex items-center justify-center">
            <RefreshCw className="w-4 h-4 mr-1" />
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;