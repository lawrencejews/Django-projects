import Link from "next/link"
import { Package2 } from "lucide-react"

function BrandLink({ displayName, className }) {

  const finalClass = className ? className : "flex items-center gap-2 text-lg font-semibold"

  return (
    <Link
      href="/"
      className={finalClass}
    >
      <Package2 className="h-6 w-6" />
      {displayName ?
        <span >Saas</span>
        :
        <span className="sr-only">Saas</span>
      }
    </Link>
  )
}

export default BrandLink;
