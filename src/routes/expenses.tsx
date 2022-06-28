import "./expenses.css"


export default function Expenses() {
  const baseClass = 'Expenses'



  
    return (
      <div className={`${baseClass}--wrapper`}>      
        <main className={`${baseClass}--map`}>
          <h2>map goes here</h2>
        </main>
        <div className={`${baseClass}--sidebar`}>
          <h2>side panel</h2>
        </div>
      </div>
    );
  }