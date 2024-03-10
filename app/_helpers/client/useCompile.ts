import { useState } from 'react';
import axios, { AxiosError } from 'axios';

const useCompile = () => {
  const [processing, setProcessing] = useState(false);
  const [outputDetails, setOutputDetails] = useState<any>(null);

  // Single definition for headers
  const rapidAPIHeaders = {
    "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
  };

  const compile = async (languageId: number, code: string, customInput: string) => {
    setProcessing(true);
    const formData = {
      language_id: languageId,
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: process.env.NEXT_PUBLIC_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        ...rapidAPIHeaders,
      },
      data: formData,
    };

    try {
      const response = await axios.request(options);
      console.log("res.data", response.data);
      const token = response.data.token;
      checkStatus(token);
    } catch (err) {
      handleAxiosError(err);
    }
  };

  const checkStatus = async (token: string) => {
    const options = {
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_RAPID_API_URL}/${token}`,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        ...rapidAPIHeaders,
      },
    };
    try {
      const response = await axios.request(options);
      let statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => checkStatus(token), 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        console.log("response.data", response.data);
      }
    } catch (err) {
      handleAxiosError(err);
    }
  };

  // Type guard for handling Axios errors
  const handleAxiosError = (err: unknown) => {
    if (axios.isAxiosError(err)) {
      const error = err as AxiosError;
      let message = error.message;
      let status = error.response?.status;
      console.log("Error status:", status, "Message:", message);
      if (status === 429) {
        console.log("Too many requests");
        // Handle specific error...
      }
    } else {
      console.error("An unexpected error occurred:", err);
    }
    setProcessing(false);
  };

  return { compile, processing, outputDetails };
};

export default useCompile;