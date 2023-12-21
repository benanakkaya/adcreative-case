import CharacterList from "./components/CharacterList/CharacterList";
import SearchForm from "./components/SearchForm/SearchForm";

export default function Home() {


  return (
   <main className="p-4 container">
      <div className="m-auto  md:w-4/5 lg:w-2/5 p-2 flex flex-col gap-2 border-blue-400 border-2 rounded-md">
        <SearchForm />
        <CharacterList />
      </div>
   </main>
  )
}
