import link from 'next/dist/client/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const CreateOptionsComponent = ({ showOptions, updateShowOptions }: any) => {
    useEffect(() => {
        // Initialize the dropdown
        const dropdownTrigger = document.querySelector('.dropdown-trigger');
        if (dropdownTrigger) {
            M.Dropdown.init(dropdownTrigger, { coverTrigger: false });
        }
    }, []);
    const [isHidden, setIsHidden] = useState(true); 
    // console.log(isHidden);
    // const updateHidden = () => {
    //     console.log(11)
    //     setIsHidden(!isHidden);        
    // }
    // console.log(isHidden);
    // dropdown-trigger 
    return (
        <>
            <div className="nav-wrapper nav-2">
            <a
                className="btn waves-effect waves-light btn btn-flat white-text"              
                // onClick={updateHidden}
                data-target="btn-dropdown"
            >New
            </a>

            <ul id='btn-dropdown' className='dropdown-content'>
                {
                    // isHidden === false ?(
                        <>
                            <li><a href="#!"><i className="material-icons">view_module</i>Create a folder</a></li>
                            <li><a href="#!"><i className="material-icons">cloud</i>Upload a file</a></li>
                        </>    
                    // ) : null
                }
               
            </ul>
        </div>
        </>
        
    );
}
export default CreateOptionsComponent;