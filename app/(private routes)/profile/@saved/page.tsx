import TravellersStories from '@/components/ui/TravellersStories/TravellersStories';
// тут буде запит до API за збереженими історіями

export default async function MySavedStoriesPage() {
  const stories = []; // сюди прийдуть дані з сервера
  return <TravellersStories stories={stories} />;
}
