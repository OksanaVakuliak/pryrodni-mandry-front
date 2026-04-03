import { Skeleton } from '@/components/ui/Skeleton/Skeleton';
import { Loader } from '@/components/ui/Loader/Loader';

export default function Page() {
  return (
    <div style={{ padding: '20px', position: 'relative' }}>
      <Loader />
      <Skeleton width="100%" height="40px" className="mb-4" />
      <Skeleton width="80%" height="20px" className="mb-2" />
      <Skeleton width="60%" height="20px" className="mb-4" />
      <Skeleton width="100%" height="200px" className="mb-4" />
      <Skeleton width="100%" height="20px" className="mb-2" />
      <Skeleton width="100%" height="20px" className="mb-2" />
      <Skeleton width="100%" height="20px" />
    </div>
  );
}
