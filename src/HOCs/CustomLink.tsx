import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';

function CustomLink({ children, to, ...props }: LinkProps) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  let classActive = match ? 'active' : null;

  return (
    <Link className={`nav-link ${classActive}`} to={to} {...props}>
      {children}
    </Link>
  );
}

export default CustomLink;
