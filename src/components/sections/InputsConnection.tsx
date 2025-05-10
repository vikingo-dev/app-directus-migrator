interface InputsConnectionProps {
  title: string;
  url: string;
  disabled: boolean;
  token: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: "source" | "destination";
}

const InputsConnection: React.FC<InputsConnectionProps> = ({
  title,
  url,
  disabled,
  token,
  handleChange,
  type,
}) => {
  return (
    <div className='flex-1 flex flex-col'>
      <h2 className='text-lg font-bold'>{title}</h2>
      <label className='mt-2'>
        URL
        <input
          disabled={disabled}
          type='text'
          name={`${type}-url`}
          placeholder='https://directus.example.source.com'
          className='border rounded p-2 w-full mt-1'
          value={url}
          onChange={handleChange}
        />
      </label>
      <label className='mt-4'>
        Access Token
        <input
          disabled={disabled}
          type='password'
          name={`${type}-token`}
          placeholder='Enter access token'
          className='border rounded p-2 w-full mt-1'
          value={token}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default InputsConnection