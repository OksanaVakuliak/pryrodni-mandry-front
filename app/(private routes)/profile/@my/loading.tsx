// import { SkeletonCard } from '@/components/ui/SkeletonCard/SkeletonCard';
import css from './loading.module.css';

export default function Loading() {
  return (
    <div className={css.grid}>
      {[...Array(6)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
