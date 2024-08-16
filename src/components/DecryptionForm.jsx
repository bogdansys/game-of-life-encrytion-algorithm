import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { decrypt } from '../utils/encryption';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import EncryptionStagesVisualization from './EncryptionStagesVisualization';

const DecryptionForm = ({ initialKey = '' }) => {
  const [ciphertext, setCiphertext] = useState('');
  const [key, setKey] = useState(initialKey);
  const [plaintext, setPlaintext] = useState('');
  const [error, setError] = useState('');
  const [decryptionStages, setDecryptionStages] = useState([]);

  useEffect(() => {
    setKey(initialKey);
  }, [initialKey]);

  const handleDecrypt = () => {
    try {
      setError('');
      console.log('Decrypting with:', { ciphertextLength: ciphertext.length, keyLength: key.length });
      const { decrypted, stages } = decrypt(ciphertext, key, (stage) => {
        setDecryptionStages(prevStages => [...prevStages, stage]);
      });
      console.log('Decryption successful. Plaintext length:', decrypted.length);
      setPlaintext(decrypted);
    } catch (error) {
      console.error('Decryption error:', error);
      setError(error.message || 'Decryption failed. Please check your input and try again.');
      setPlaintext('');
      setDecryptionStages([]);
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        value={ciphertext}
        onChange={(e) => setCiphertext(e.target.value)}
        placeholder="Enter ciphertext"
        rows={4}
      />
      <Input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Enter decryption key (at least 32 characters)"
      />
      <Button onClick={handleDecrypt} disabled={ciphertext.length === 0 || key.length < 32}>Decrypt</Button>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {decryptionStages.length > 0 && (
        <div>
          <h3 className="font-bold mb-2">Decryption Stages:</h3>
          <EncryptionStagesVisualization stages={decryptionStages} />
        </div>
      )}
      {plaintext && (
        <div>
          <h3 className="font-bold">Plaintext:</h3>
          <Textarea value={plaintext} readOnly rows={4} />
        </div>
      )}
    </div>
  );
};

export default DecryptionForm;