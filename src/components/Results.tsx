import React from 'react';
import { CalculationResult } from '../types';
import { RefreshCw } from 'lucide-react';

interface ResultsProps {
  results: CalculationResult;
  onReset: () => void;
}

const Results: React.FC<ResultsProps> = ({ results, onReset }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-center mb-4">Calculation Results</h2>
      <div className="grid grid-cols-2 gap-4">
        {results.bricks > 0 && (
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800">Bricks</h3>
            <p className="text-2xl font-bold text-blue-600">{results.bricks}</p>
          </div>
        )}
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800">Aggregate (m³)</h3>
          <p className="text-2xl font-bold text-green-600">{results.aggregate}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h3 className="font-semibold text-yellow-800">Cement Bags</h3>
          <p className="text-2xl font-bold text-yellow-600">{results.cementBags}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg">
          <h3 className="font-semibold text-red-800">Sand (m³)</h3>
          <p className="text-2xl font-bold text-red-600">{results.sand}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-800">Steel (metric tons)</h3>
          <p className="text-2xl font-bold text-purple-600">{results.steel}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800">Total Volume (m³)</h3>
          <p className="text-2xl font-bold text-gray-600">{results.volume}</p>
        </div>
      </div>
      <button
        onClick={onReset}
        className="w-full mt-6 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center justify-center"
      >
        <RefreshCw className="w-5 h-5 mr-2" />
        Calculate Again
      </button>
    </div>
  );
};

export default Results;