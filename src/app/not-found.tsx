//Internal app
import { NotFoundError } from '@/components';

export default function NotFound() {
  return <NotFoundError code={404} />;
}
