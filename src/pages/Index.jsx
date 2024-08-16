import React, { useState } from 'react';
import EncryptionForm from '../components/EncryptionForm';
import DecryptionForm from '../components/DecryptionForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileDown, Info, Linkedin, Github, BarChart2 } from "lucide-react";

const Index = () => {
  const [sampleText, setSampleText] = useState('');
  const [sampleKey, setSampleKey] = useState('');

  const generateSampleInput = () => {
    const text = "Hello, World! This is a test message for encryption.";
    const key = "ThisIsASecretKey1234567890AbCdEfGh";
    setSampleText(text);
    setSampleKey(key);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary">Game of Life Encryption</h1>
        <p className="text-lg text-gray-600 mb-4">Experience encryption inspired by Conway's Game of Life</p>
        <div className="flex justify-center space-x-4 mb-4">
          <Button onClick={generateSampleInput} variant="outline">Generate Sample Input</Button>
          <Button asChild>
            <a href="https://drive.google.com/file/d/1oZsEHLxmmZXTQ6m93uHAKCCuKAWG3d2M/view?usp=sharing" target="_blank" rel="noopener noreferrer">
              <FileDown className="mr-2 h-4 w-4" /> View Report
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="/test-results">
              <BarChart2 className="mr-2 h-4 w-4" /> Test Results
            </a>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline"><Info className="mr-2 h-4 w-4" /> About</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>About This Demo</DialogTitle>
                <DialogDescription>
                  This application is a demonstration of encryption concepts inspired by Conway's Game of Life. 
                  Please note that it does not include all features described in the full report and should not 
                  be used for actual secure communications. For a complete understanding of the proposed 
                  encryption method, please refer to the downloadable report.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex justify-center space-x-4">
          <Button asChild variant="outline">
            <a href="https://www.linkedin.com/in/iordache-mihai-bogdan-676444187/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="https://github.com/bogdansys" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank" rel="noopener noreferrer">
              <Info className="mr-2 h-4 w-4" /> Learn More
            </a>
          </Button>
        </div>
      </header>
      
      {sampleText && sampleKey && (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Sample Input</h2>
          <p><strong>Text:</strong> {sampleText}</p>
          <p><strong>Key:</strong> {sampleKey}</p>
        </div>
      )}
      
      <Tabs defaultValue="encrypt" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="encrypt">Encrypt</TabsTrigger>
          <TabsTrigger value="decrypt">Decrypt</TabsTrigger>
        </TabsList>
        <TabsContent value="encrypt">
          <EncryptionForm initialText={sampleText} initialKey={sampleKey} />
        </TabsContent>
        <TabsContent value="decrypt">
          <DecryptionForm initialKey={sampleKey} />
        </TabsContent>
      </Tabs>

      <footer className="mt-8 text-center text-sm text-gray-600">
        <h3 className="font-semibold mb-2">Acknowledgments</h3>
        <p>Special thanks to YouTube for educational resources and ChatGPT for assistance in development.</p>
      </footer>
    </div>
  );
};

export default Index;