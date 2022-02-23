import React, { FC } from 'react';
import { InsuranceProvider } from '../providers/InsuranceProvider';
import { UserProvider } from '../providers/UserProvider';


export const Providers: FC = ({ children }) => {
    return (
        <InsuranceProvider>
            <UserProvider>{children}</UserProvider>
        </InsuranceProvider>
    )
}
