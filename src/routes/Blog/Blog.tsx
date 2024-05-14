import { useParams } from 'react-router-dom';

export function Blog() {
  const { id } = useParams();
  return <div>Blog {id}</div>;
}
