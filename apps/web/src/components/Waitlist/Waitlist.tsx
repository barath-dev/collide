import { Button } from '../ui/button';
import { Input } from '../ui/input';
import './Waitlist.css';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useState, useEffect, SetStateAction, useRef } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { Loader2 } from 'lucide-react';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [userCount, setUserCount] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [className, setClassName] = useState('button');
  const [clicked, setClicked] = useState(false);
  const [text, setText] = useState('');
  const buttonRef=useRef<HTMLButtonElement>(null);


  useEffect(() => {
    // Establish WebSocket connection when component mounts
    try {
      const ws =  new WebSocket("wss://collide-test.up.railway.app/");
      ws.onopen = () => {
        console.log('Connected to WebSocket server');
      };
  
      ws.onmessage =async (event) => {
        const data = await JSON.parse(event.data);
        if (data.count !== undefined) {
          setUserCount(data.count);
        }
      };
  
   
      ws.onclose = () => {
        console.log('Disconnected from WebSocket server');
      };
  
      return () => {
        ws.close();
      };
    } catch (error) {
      console.log('Error:', error);
    }
    
  }, []);

  const onChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setEmail(e.target.value);
  }

  const isValidEmail = (test: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(test);
  }

  const handleSubmit = async () => {
    setClicked(true);
    if (isValidEmail(email)) {
      try {
        setButtonDisabled(true);
        setClassName('button disabled');
        const headers = {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        };    

        const response = await axios.post(`https://collide-test.up.railway.app/submit`, { email },{headers:headers});
        if(response.status===200){
          setEmail("");
          setText('');
        }else{
          setText("Some error occured");
        }
        setButtonDisabled(false);
        setClassName('button');
        console.log(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      setText('Enter a valid email address');
    }
  };

  const handleKeyDown = (event: { key: string; }) => {
    if (event.key === 'Enter' && buttonRef.current) {
      buttonRef.current.click();
    }
  }

  return (
    <div>
      <Card className='Waitlist-box'>
        <div className="logo">
          <img src="src\assets\Logo.svg" alt="logo" />
        </div>
        <CardHeader className="header">
          <CardTitle className='box-title'>
            <p> <span className='theme-font'>Something’s</span>  cooking </p>
          </CardTitle>
          <div className="fire-container">
            <Player
              className='fire'
              src="https://lottie.host/b00042d8-47f0-4adc-bf28-c91382ebadd9/rOhxjAuKus.json"
              loop
              autoplay
            ></Player>
          </div>
        </CardHeader>
        <CardDescription className='box-description'>Be among the first to explore an innovative platform redefining how you engage with others. Prepare to dive into a realm of endless intrigue and unexpected connections, where every interaction unveils new mysteries. Secure your place now to become part of a groundbreaking experience.</CardDescription>
        <CardContent className='Waitlist-content'>
          <span className='theme-font'>Join our</span> waiting list<span className='theme-font'> to get updated asap</span>
        </CardContent>
        <CardContent className='container'>
          <Input type="email" placeholder="Email" className='email_input' onChange={onChange} onKeyDown={handleKeyDown} value={email} />
          
          <Button ref={buttonRef} className={className} onClick={handleSubmit} disabled={buttonDisabled} >
            {buttonDisabled ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <>Join waitlist 
              <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className='arrow'>
              <path
                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
              </svg></>}
          </Button>
        </CardContent>
        {!isValidEmail(email) && clicked && <div className="error">{text}</div>}
        <CardContent className='user-count'>
          {userCount} USERS WAITING
        </CardContent>
      </Card>
    </div>
  );
}
