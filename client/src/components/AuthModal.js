import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

const AuthModal = ({ setShowModal, isSignUp }) => {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)

    let navigate = useNavigate()

    console.log(email, password, confirmPassword)


    const handleClick = () => {
        setShowModal(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isSignUp && (password !== confirmPassword)) {
                setError('Passwords need to match!')
                return
            }

            const response = await axios.post('http://localhost:8000/signup', { email, password })

            const success = response.status === 201

            if (success) navigate('/onboarding')



        }
        catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="auth-modal">
            <div className="close-icon" onClick={handleClick}>❌</div>
            <h2>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
            <p>By clicking Log in, you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    id="email"
                    placeholder="email"
                    required="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    placeholder="password"
                    required="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isSignUp && <input
                    type="password"
                    id="password-check"
                    placeholder="password-check"
                    required="confirm password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />}
                <input className="secondary-button" type="submit" />
                <p>{error}</p>

            </form>
            <hr />
            <h2>GET THE APP</h2>
            AUTH MODAL
        </div>
    )
}
export default AuthModal;