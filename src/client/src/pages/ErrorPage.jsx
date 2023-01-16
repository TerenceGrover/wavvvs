import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="h-screen text-neutral-200 flex justify-center items-center text-sm font-light">
      <p>404</p>
      <div className="border-l-2 border-neutral-800 h-8 mx-3"></div>
      <i className="text-xs text-neutral-400">
        {error?.statusText || error?.message || 'Not Found'}
      </i>
    </div>
  );
}
