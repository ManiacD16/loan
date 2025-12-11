import React from 'react'

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  src: string
  alt: string
}
export default function Image(props: Props) {
  const { src, alt, ...rest } = props
  return <img src={src} alt={alt} {...rest} />
}