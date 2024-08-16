import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { encrypt, decrypt } from '../utils/encryption';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { Progress } from "@/components/ui/progress";

const TestResults = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const runTests = async () => {
    setLoading(true);
    setProgress(0);
    const testSizes = [100, 1000, 10000, 100000];
    const testResults = [];

    for (let i = 0; i < testSizes.length; i++) {
      const size = testSizes[i];
      const plaintext = 'A'.repeat(size);
      const key = 'ThisIsATestKey1234567890AbCdEfGh';

      const encryptStart = performance.now();
      const { encrypted } = encrypt(plaintext, key, () => {});
      const encryptEnd = performance.now();

      const decryptStart = performance.now();
      const { decrypted } = decrypt(encrypted, key, () => {});
      const decryptEnd = performance.now();

      testResults.push({
        size,
        encryptTime: encryptEnd - encryptStart,
        decryptTime: decryptEnd - decryptStart,
        correct: plaintext === decrypted
      });

      setProgress((i + 1) / testSizes.length * 100);
      // Add a small delay to allow React to update the UI
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    setResults(testResults);
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">Game of Life Encryption Test Results</h1>
      <div className="flex space-x-4 mb-4">
        <Button onClick={runTests} disabled={loading}>
          {loading ? 'Running Tests...' : 'Run Tests'}
        </Button>
        <Button onClick={() => navigate('/')} variant="outline">Return to Main Page</Button>
      </div>

      {loading && (
        <div className="mb-4">
          <Progress value={progress} className="w-full" />
          <p className="text-center mt-2">{Math.round(progress)}% Complete</p>
        </div>
      )}

      {results && (
        <>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Performance Results</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Input Size</TableHead>
                    <TableHead>Encrypt Time (ms)</TableHead>
                    <TableHead>Decrypt Time (ms)</TableHead>
                    <TableHead>Correctness</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell>{result.size}</TableCell>
                      <TableCell>{result.encryptTime.toFixed(2)}</TableCell>
                      <TableCell>{result.decryptTime.toFixed(2)}</TableCell>
                      <TableCell>{result.correct ? 'Pass' : 'Fail'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={results}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="size" label={{ value: 'Input Size', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Time (ms)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="encryptTime" stroke="#8884d8" name="Encrypt Time" />
                  <Line type="monotone" dataKey="decryptTime" stroke="#82ca9d" name="Decrypt Time" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default TestResults;