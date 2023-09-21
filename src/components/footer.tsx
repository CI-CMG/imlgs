import './footer.css'
const appversion = import.meta.env.VITE_applicationVersion

export default function Footer() {
  return (
      <footer className='Footer'>
        <span className='Footer--appversion'>Version {appversion}</span>
      </footer>
  )
}
