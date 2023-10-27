import React, { useState } from "react";
import { useAppSelector } from "../../state/store";

export const UserList = () => {

    
    const firstName = useAppSelector((state) => state.auth.firstName);

    return (
            <>
                {firstName}
            </>
    )
}