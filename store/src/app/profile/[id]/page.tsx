
export default function UserProfile({params}) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Profile Id </h1>
        <hr />
        <p className="text-4xl">profile page <span className="bg-orange-500 text-white">{params.id}</span></p>
      </div>
    )
  }
  