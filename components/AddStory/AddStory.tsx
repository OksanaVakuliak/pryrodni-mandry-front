import { PageTitle } from "../ui/PageTitle/PageTitle";
import css from './AddStory.module.css';
import AddStoryForm from "./AddStoryForm/addStoryForm";

export default function AddStory() {
    return (
        <>
            <PageTitle tag="h1" className={css.title}>Створити нову історію</PageTitle>
            <AddStoryForm/>
        </>
    );
}
