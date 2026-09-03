'use client'
export default function Error(){return <div className="section"><div className="container"><p className="mono">Something went wrong</p><h1 className="display text-6xl mt-4">The page could not load.</h1><button className="mt-8 border border-black rounded-full px-5 py-3" onClick={()=>location.reload()}>Try again</button></div></div>}
