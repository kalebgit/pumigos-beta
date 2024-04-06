import { useState } from "react"
import Input from "../components/Input"

export default function Signup(){
    const [isLogin, setIsLogin] = useState(true)

    
    return (
        <>
            <form className=" flex flex-row flex-nowrap justify-center items-center w-full p-5">
                <fieldset className=" flex flex-col flex-nowrap gap-2 w-1/3">
                    <Input type="email" text="email" name="email" required/>
                    <Input type="password" text="contraseña" name="password" required/>
                    {!isLogin && 
                    <Input type="password" text="confirmar contraseña" name="confirmPassword" required/>}
                    {isLogin ? <span>No tienes una cuenta?</span> : <span>Ya tienes una cuenta?</span>}
                    <button onClick={(e)=>{
                        e.preventDefault()
                        setIsLogin(state=>!state)
                    }} className=" text-blue-400 hover:underline">{isLogin ? 'Registrate' : 'Iniciar Sesion'}</button>
                </fieldset>
                
            </form>
        </>
    )
}

