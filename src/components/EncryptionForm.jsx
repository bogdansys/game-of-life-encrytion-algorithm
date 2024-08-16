import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { encrypt } from '../utils/encryption';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import EncryptionStagesVisualization from './EncryptionStagesVisualization';

const EncryptionForm = ({ initialText = '', initialKey = '' }) => {
  const [plaintext, setPlaintext] = useState(initialText);
  const [key, setKey] = useState(initialKey);
  const [ciphertext, setCiphertext] = useState('');
  const [error, setError] = useState('');
  const [encryptionStages, setEncryptionStages] = useState([]);

  useEffect(() => {
    setPlaintext(initialText);
    setKey(initialKey);
  }, [initialText, initialKey]);

  const handleEncrypt = () => {
    try {
      setError('');
      console.log('Encrypting with:', { plaintextLength: plaintext.length, keyLength: key.length });
      const { encrypted, stages } = encrypt(plaintext, key, (stage) => {
        setEncryptionStages(prevStages => [...prevStages, stage]);
      });
      console.log('Encryption successful. Ciphertext length:', encrypted.length);
      setCiphertext(encrypted);
    } catch (error) {
      console.error('Encryption error:', error);
      setError(error.message || 'Encryption failed. Please check your input and try again.');
      setCiphertext('');
      setEncryptionStages([]);
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        value={plaintext}
        onChange={(e) => setPlaintext(e.target.value)}
        placeholder="Enter plaintext"
        rows={4}
      />
      <Input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Enter encryption key (at least 32 characters)"
      />
      <Button onClick={handleEncrypt} disabled={plaintext.length === 0 || key.length < 32}>Encrypt</Button>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {encryptionStages.length > 0 && (
        <div>
          <h3 className="font-bold mb-2">Encryption Stages:</h3>
          <EncryptionStagesVisualization stages={encryptionStages} />
        </div>
      )}
      {ciphertext && (
        <div>
          <h3 className="font-bold">Ciphertext:</h3>
          <Textarea value={ciphertext} readOnly rows={4} />
        </div>
      )}
    </div>
  );
};

export default EncryptionForm;