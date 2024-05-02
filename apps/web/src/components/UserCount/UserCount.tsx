import  { useEffect, useState } from 'react'

export default function UserCount() {

    const [userCount, setUserCount] = useState(0);


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
      
  return (
    <div>
         {userCount} USERS WAITING
    </div>
  )
}
