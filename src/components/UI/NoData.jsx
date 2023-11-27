import { FileText } from 'lucide-react'
import React from 'react'

function NoData({children, title,desc}) {
  return (
    <div className="w-full mt-5 rounded-xl flex flex-col text-center gap-5 items-center justify-center h-96 bg-white">
            {children}
            <div>
            <p className="text-xl font-semibold">{title}</p>
            <p className="font-medium text-sv-grey">{desc}</p>
            </div>
    </div>
  )
}

export default NoData