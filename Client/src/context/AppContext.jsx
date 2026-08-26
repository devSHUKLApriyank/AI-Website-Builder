import { createContext, useContext } from "react";



export const AppContext = createContext(undefined)

export function AppContextProvider({children}){

    //Auth State
    const [user, setUser]= useState(null);
    const [loadingUser, setLoadingUser] = useState(true);


    return (
        <AppContext.Provider value={{
            user,
            loadingUser,
        }}>

        </AppContext.Provider>
    )
}

export function useAppContext(){
    const context = useContext(AppContext);
    if(context === undefined){
        throw new Error("useAppContext must be use within an AppContextProvider")
    }
    return context;
}