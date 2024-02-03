"use client"
import { ILogin } from "@/interfaces/login.interface";
import { useLoginMutation } from "@/redux/features/apis/auth-api";
import { FormEvent, useState } from "react";


const LoginComponent = () => {
    const [isHidden, setHidden] = useState(false);
    // const [formData, setFormData] = useState<ILogin>({
    //     email: '',
    //     password: '',
    //   });
    const [login] = useLoginMutation();

    const handleHiddenElement = () => {
        setHidden(!isHidden);
    }
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        const formDataFromEvent = new FormData(event.currentTarget);
    
        // Extract values from FormData
        const email = formDataFromEvent.get('email') as string;
        const password = formDataFromEvent.get('password') as string;
        event.preventDefault();
        console.log({ email })
        console.log({ password })
        const loginPayload ={
            email: email,
            password: password
        }
        // console.log({ formData})
        const response: any = await login(loginPayload);
        if (response?.error) {
            // setFormData({
            //     email: '',
            //     password: ''
            // })
          return "Something went wrong.";
        }
        // setFormData({
        //     email: '',
        //     password: ''
        // })
      };
    return (
        <div>
            <main>
                <center>
                    <img className="responsive-img" style={{ width: '250px'}} src="https://i.imgur.com/ax0NCsK.gif" />
                    <div className="section"></div>

                    <h5 className="indigo-text">Please, login into your google drive account</h5>
                    <div className="section"></div>

                    <div className="container">
                        <div className="z-depth-1 grey lighten-4 row" style={{ display: "inline-block", padding: "32px 48px 0px 48px", border: "1px solid #EEE;" }}>

                            <form className="col s12" onSubmit={handleSubmit}>
                                <div className='row'>
                                    <div className='col s12'>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input className='validate' type='email' name='email' id='email' />
                                        <label htmlFor='email'>Enter your email</label>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input className='validate' type='password' name='password' id='password' />
                                        <label htmlFor='password'>Enter your password</label>
                                    </div>
                                    <label style={{ float: "right"}}>
                                        {/* <a className='pink-text' href='#!'><b>Forgot Password?</b></a> */}
                                    </label>
                                </div>

                                <br />
                                <center>
                                    <div className='row' style={{ marginBottom: 10}}>
                                        <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo'>Login</button>
                                    </div>
                                </center>
                            </form>
                        </div>
                    </div>
                    {/* <a href="#!">Create account</a> */}
                </center>

                <div className="section"></div>
                <div className="section"></div>
            </main>
        </div>
    );
}

export default LoginComponent;