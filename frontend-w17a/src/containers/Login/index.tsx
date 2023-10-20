import { LoginForm as LoginFormProps, LoginResponse2 } from "../../types"
import { LoginForm } from "../../components"

const Login = () => {

    const onSubmit = async (data: LoginFormProps) => {
        const fetching = await fetch('https://mock-api.arikmpt.com/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }) // ini berhasil
        const response: LoginResponse2 = await fetching.json() // bakal gagal -> response = null, solusi ?
        if(fetching.ok) {
            //response
            localStorage.setItem('token', response.data.token)
        //     // 'token'
        //     // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM5OTNlMmU3LWRiMzMtNGY3Mi04N2IzLWU4ODFhYjdkZjNlYSIsImlhdCI6MTY5NTczMzgwNiwiZXhwIjoxNjk1NzU1NDA2fQ.mJuCVBzjiHmjKtE-V623lQ2FVg4vTRYeqzBmELadgUk
            window.location.replace('/') 
        // } those part above is for advance assignment, a part below is for intermediate assignment 
        // if (fetching.ok) {
        //     // localStorage.setItem('token', response.data.token)
        //     window.location.replace('/')
        }
        fetching.status
    }

    return (
        <LoginForm onSubmit={onSubmit}/>
    )
}

export default Login