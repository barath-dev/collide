
import './App.css'
import Introanimation from './components/Animation/Introanimation'
import Waitlist from './components/Waitlist/Waitlist'

function App() {

  return (
    <>
    <div className='ani'>
    <Introanimation />
    </div>
     <div className="App">
     <Waitlist/>
    </div>
    </>
   
  )
}

export default App
