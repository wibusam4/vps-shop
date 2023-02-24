interface ErrorFormProps {
  error?: string;
  isTouched?: boolean;
}

const ErrorForm: React.FC<ErrorFormProps> = ({ error, isTouched }) => {
  return (
    <>
      {error && isTouched ? (
        <div className="alert alert-error mt-2 rounded p-2 text-white">
          <div>
            <span>{error}</span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ErrorForm;
