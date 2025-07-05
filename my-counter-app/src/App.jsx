import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibolityFilter'
const App = () => {
  /*const filterSelected = value=>{
    console.log(value)
  }*/

  return (
    <>
        <NewNote />
        <VisibilityFilter />
        <Notes />
    </>
  )
}

export default App