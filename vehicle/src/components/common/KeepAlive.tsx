import React from 'react';
import { Route } from 'react-router-dom';
export default function KeepAlive({ path, children, ...rest }: {path: string, children: JSX.Element}) {
  const child = (props: {match: any}): React.ReactNode => {
    return (
      <div
        className="keep-alive"
        style={{ height: "100%", display: props.match ? 'block' : 'none' }}>
        {children}
      </div>
    )
  }

  return <Route path={path} {...rest} children={child} />
}