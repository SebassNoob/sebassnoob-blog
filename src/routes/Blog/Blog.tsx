import { useParams } from 'react-router-dom';
import lol from '@/content/index.xml';

export function Blog() {
  const { id } = useParams();

  return (
    <div>
      Blog {id}, {JSON.stringify(lol)}
    </div>
  );
}
