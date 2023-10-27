import React, { useState } from "react";
import { useAppDispatch } from "../../state/store";
import { login } from "../../state/features/authSlice";
import { IAuthState } from "../../state/interface/IAuthState";

type userFirstName = {
    firstName: string
}

export const Add = () => {

    const dispatch = useAppDispatch()
    const [firstName, setFirstName] = useState<string>('')
    const firstUserName: userFirstName| any = ''

    const changeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => 
    {
        setFirstName(e.target.value);
    }
    const submitForm = () => 
    {
    //   alert(name);
         dispatch(login({firstName}))
         console.log(firstUserName)
    }

    return (
            <>
                <input type="text" id="firstname" name="firstname" placeholder="Enter Firstname" onChange={(e) => changeFirstName(e)} style={{  padding: '10px 15px'  }}/>
                <input type="button" id="submit" name="submit" value="SAVE" onClick={submitForm}  style={{  padding: '10px 15px' , backgroundColor: 'ButtonShadow'}}/>
            </>
    )
}