interface ErrorMessage {
  message: string;
}

const setError = (message: string): ErrorMessage => {
  return {
    message,
  };
};

export { setError, ErrorMessage };
