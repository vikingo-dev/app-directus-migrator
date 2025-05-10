const OnlyUrl = ({
  type, value
}: {
  type: "source" | "destination",
  value: string
}) => {
  return (
    <div className='flex-1 flex flex-col'>
      <h2 className='text-sm font-bold capitalize'>{type}</h2>
      <div className='mt-1 w-full truncate rounded text-ellipsis overflow-hidden max-w-[450px] text-gray-400'>
        {value}
      </div>
    </div>
  )
}

export default OnlyUrl