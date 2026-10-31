import {useState} from 'react';
import {Link} from 'react-router-dom';
import DodgeField from './components/ui/DodgeField';
import ScrollFloat from './components/ui/ScrollFloat';
import DataRain from './components/ui/data-rain';
import './landing.css';
const palette={calm:'#6f8256',mid:'#98452f',hot:'#b57747'};
export function Landing(){
 const [paused,setPaused]=useState(false);
 const [exploreFocused,setExploreFocused]=useState(false);
 const float=(text:string)=> <ScrollFloat disabled={paused} splitBy="words" animationDuration={.7} ease="power3.out" stagger={.035} distance={55} stretch={1.15} scrollStart="top bottom" scrollEnd="top 78%">{text}</ScrollFloat>;
 return <div className="landing-page">
  <DataRain fullscreen={false} count={window.innerWidth<700?650:1700} flowSpeed={.65} obstacleRadius={80} palette={palette} paused={paused}/>
  <a className="skip" href="#welcome">Skip to content</a>
  <header className="landing-header">
   <Link className="logo" to="/" aria-label="CiteDesk home"><span className="brand-bracket">[</span>{float('CiteDesk')}<span className="brand-bracket">]</span></Link>
   <Link className="landing-login" to="/admin/login">{float('Login')}<span aria-hidden="true">↗</span></Link>
  </header>
  <main id="welcome" className="landing-content">
   <div className="eyebrow">{float('SUPPORT ANSWERS, WITH SOURCES.')}</div>
   <h1>{float('A little clarity.')}<br/><em>{float('A source to trust.')}</em></h1>
   <p>{float('Your questions, answered from approved knowledge.')}<br className="landing-desktop-break"/>{' '}{float('Search the library or ask CiteDesk, then follow the evidence.')}</p>
   <div className="landing-actions">
    <div className="explore-dodge" onFocusCapture={()=>setExploreFocused(true)} onBlurCapture={()=>setExploreFocused(false)}>
     <DodgeField fieldHeight={200} reach={76} radius={115} patience={6} axis="both" inkColor="#98452f" contrastColor="#f2efe7" disabled={paused||exploreFocused}>
      <Link className="button" to="/explore">{float('Explore without signing in')}<span aria-hidden="true">→</span></Link>
     </DodgeField>
    </div>
    <div className="signin-guidance">
     <p className="signin-guidance-title">{float('Let us help you get started.')}</p>
     <p>{float('Sign in for the full CiteDesk experience, or explore at your own pace as a guest.')}</p>
     <Link className="signin-guidance-link" to="/admin/login">{float('Sign in for a better experience')}<span aria-hidden="true"> →</span></Link>
    </div>
   </div>
   <Link className="landing-ask" to="/assistant">{float('Have a question? Ask CiteDesk')}<span aria-hidden="true">↗</span></Link>
   <div className="landing-note">{float("An open knowledge base. An honest answer when we don't know.")}</div>
  </main>
  <footer className="landing-footer">
   <span>{float('Orbit Workspace / Fictional demo content')}</span>
   <nav aria-label="Footer"><Link to="/privacy">{float('Privacy')}</Link><Link to="/terms">{float('Terms')}</Link><button className="motion-toggle" aria-pressed={paused} onClick={()=>setPaused(v=>!v)}>{paused?'Resume animations':'Pause animations'}</button></nav>
  </footer>
 </div>;
}
