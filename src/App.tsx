import React, { useEffect, useState } from 'react';
import io from "socket.io-client";
import Echo from 'laravel-echo';
import Pusher from 'pusher-js'
import example from './Pusher'
import axios from 'axios';
import uuid from 'react-uuid';

window.Pusher = require('pusher-js')

const options = {
  broadcaster: 'pusher',
  key: 'myKey',
  wsHost: 'https://scentsbyhoppey.com',
  wssHost: 'https://scentsbyhoppey.com',
  wsPort: 6001,
  disableStats: true,
  cluster: 'eu2',
  forceTLS: true,
  encrypted: true,
  enabledTransports: ['ws', 'wss']
};

const echo = new Echo(options);
function App() 
{
  const [title, setTitle] = useState('Wright')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  let allMessages:any = []

  useEffect(() => 
  {
      echo.channel('try.10').listen('TryNotificationEvent', function(data: any, err: any){
          console.log(data)
      })
  }, [])

  const submitMessages = async (e:any) => 
  {
      e.preventDefault()
      const id: number = 8
      // alert(message);
      return axios.post('http://127.0.0.1:8000/api/message', {
          id, title, message
      })
      .then(function (response) {
          console.log('**********************')
          console.log(response.data);
          console.log('**********************')
          setMessage('')
      })
      .catch(function (error) {  
            // console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEe')
            // console.log(error);
            // console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEe')
      });
  }

  return (      
      <>
          <section style={{backgroundColor: "#eee"}}>
            <div className="container py-5">

              <div className="row d-flex justify-content-center">
                <div className="col-md-8 col-lg-6 col-xl-4">

                  <div className="card" id="chat1" style={{borderRadius: "none", minHeight: '10px'}}>
                    <div
                      className="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
                      style={{borderTopLeftRadius: "none", borderTopRightRadius: "none"}}>
                      <i className="fas fa-angle-left"></i>
                      <p className="mb-0 fw-bold">Live chat</p>
                      <i className="fas fa-times"></i>
                    </div>
                    <div className="card-body">

                        {
                            messages.map((msg:any, index:number) => 
                            {
                                return (
                                  <div key={uuid()} className="d-flex flex-row justify-content-start mb-4">
                                      <p key={uuid()} className="small mb-0">{msg}</p>
                                  </div>
                                )
                            })
                        }


                        <div className="form-outline" onSubmit={submitMessages}>
                            <form>
                                <input type='text' className="form-control" id="textAreaExample" onChange={(e) => setMessage(e.target.value)} style={{padding: "5px"}}/>
                            </form>
                        </div>
                        <input type='submit' id='submit' name='submit' value="Send message" onClick={submitMessages}/>

                    </div>

                  </div>

                </div>
              </div>

            </div>
          </section>
      </>
  );
}

export default App;
