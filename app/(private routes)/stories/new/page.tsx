import AddStoryForm from "@/components/AddStory/AddStoryForm/addStoryForm";
import { PageTitle } from "@/components/ui/PageTitle/PageTitle";

export default function CreateStoryPage() {
  
  return <>
    <PageTitle tag="h2">Створити нову історію</PageTitle>
    <AddStoryForm/>
  </>;
}
