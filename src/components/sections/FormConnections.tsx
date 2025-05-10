"use client"
import { toast } from 'sonner';
import { useState } from 'react';
import { ArrowLeftRight, Settings, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import OnlyUrl from './OnlyUrl';
import useGeneralStore from '@store/GeneralStore';
import { pingDirectus } from '@models/directusClient';
import InputsConnection from './InputsConnection';

const FormConnections = () => {
  const { conections, setConnection, setIsConnect, isConnect } = useGeneralStore();
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Change connection order
  const handleSwap = () => {
    const source = conections.source;
    const destination = conections.destination;

    setConnection('source', 'url', destination.url);
    setConnection('source', 'token', destination.token);
    setConnection('destination', 'url', source.url);
    setConnection('destination', 'token', source.token);
  };

  // Validate if the connections are valid
  const validateConnections = async (): Promise<boolean> => {
    if (!conections.source.url || !conections.destination.url) {
      setValidationError("Both source and destination URLs are required");
      return false;
    }

    if (!conections.source.token || !conections.destination.token) {
      setValidationError("Both source and destination tokens are required");
      return false;
    }

    setIsValidating(true);
    setValidationError(null);

    try {
      const sourceValid = await pingDirectus("source");
      const destinationValid = await pingDirectus("destination");

      const valid = sourceValid && destinationValid
      setIsConnect(valid)

      if (!sourceValid) {
        toast.error("We can't connect to the url Source")
        setValidationError("We can't connect to the url Source")
      }
      if (!destinationValid) {
        toast.error("We can't connect to the url Destination")
        setValidationError("We can't connect to the url Destination")
      }
      if (valid) {
        toast.success("URLs Valid")
      }

      return valid;
    } catch (error) {
      setIsConnect(false);
      if (error instanceof Error) {
        setValidationError(error.message);
      } else {
        setValidationError("An unknown error occurred during validation");
      }
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  const enabledButton = (): boolean => {
    if (conections?.source?.url && conections?.destination?.url && conections?.source?.token && conections?.destination?.token) return false
    return true;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    const type = name?.split("-")[0] as "source" | "destination"
    const nameFormat = name?.split("-")[1] as "url" | "token"
    console.log(type, nameFormat, value)
    setConnection(type, nameFormat, value)
  }

  return (
    <div className='flex flex-col gap-4 CardGlass'>
      <AnimatePresence mode="wait">
        {isConnect ? (
          <motion.div
            key="urls"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className='flex gap-4'
          >

            <OnlyUrl type="source" value={conections.source.url} />
            <OnlyUrl type="destination" value={conections.destination.url} />
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className='flex gap-4'>
              <InputsConnection disabled={isConnect || isValidating} title='Source' type='source' url={conections?.source?.url} token={conections?.source?.token} handleChange={handleChange} />

              <div className='flex items-center'>
                <button onClick={handleSwap} className='p-2 rounded-full bg-transparent hover:bg-gray-600/40 cursor-pointer hover:scale-105'>
                  <ArrowLeftRight size={24} />
                </button>
              </div>

              <InputsConnection disabled={isConnect || isValidating} title='Destination' type='destination' url={conections?.destination?.url} token={conections?.destination?.token} handleChange={handleChange} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {validationError && (
        <div className='px-4 py-2 rounded-md border-2 border-red-500 text-red-500'>{validationError}</div>
      )}

      {isConnect ? (
        <button
          onClick={() => setIsConnect(false)}
          className='w-fit mx-auto flex flex-row items-center gap-2 outlined small'>
          <Settings />
          Edit connections
        </button>
      ) : (
        <button
          onClick={validateConnections}
          disabled={enabledButton() || isValidating}
          className='w-fit mx-auto flex flex-row items-center gap-2'>
          <ShieldCheck />
          {isValidating ? "Validating URL" : "Check connections"}
        </button>
      )}
    </div>
  );
};

export default FormConnections;