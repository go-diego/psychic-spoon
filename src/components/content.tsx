const Content = ({
  error,
  loading,
  children,
  empty,
  emptyMessage = 'Nothing to see here',
  className,
}: {
  error?: string | null
  loading?: boolean
  children: React.ReactNode
  empty?: boolean
  emptyMessage?: string
  className?: string
}) => {
  return (
    <div className={className}>
      {empty ? (
        <p>{emptyMessage}</p>
      ) : (
        <>
          {loading && <p>Doing the thing ...</p>}
          {error && <p>Error: {error}</p>}
          {!loading && children}
        </>
      )}
    </div>
  )
}

export default Content
