import React from 'react'
import { Link } from 'react-router-dom'

type Props = React.PropsWithChildren<{ href: string; className?: string; target?: string; rel?: string }>

export default function NextLink({ href, children, ...rest }: Props) {
  // Map Next's <Link href> to react-router <Link to>
  return <Link to={href} {...rest}>{children}</Link>
}