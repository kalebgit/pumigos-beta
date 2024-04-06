

export default function Input({text, name, className, ...params}){
    return (
        <>
            <label htmlFor={name}>{text}</label>
            <input className={" border-solid border-2 rounded-lg " + className}name={name} id={name} {...params}/>
        </>
    )
}