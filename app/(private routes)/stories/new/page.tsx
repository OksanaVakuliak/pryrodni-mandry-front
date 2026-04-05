import AddStoryForm from "@/components/AddStory/AddStoryForm/addStoryForm";
import { PageTitle } from "@/components/ui/PageTitle/PageTitle";

export default function CreateStoryPage() {
  
  return (
    <>
      <div style={{ margin: '32px 0' }}>
        <PageTitle tag="h1">Створити нову історію</PageTitle>
      </div>
      <AddStoryForm />
    </>
  );
}
