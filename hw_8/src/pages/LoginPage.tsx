const LoginPage = () => {
    return(
        <>
            <form>
                <div>
                    <label>
                    Username:
                    <input type="text" name="username" required />
                    </label>
                </div>
                <div>
                    <label>
                    Password:
                    <input type="password" name="password" required />
                    </label>
                </div>
                <button type="submit">Login</button>
            </form>        
        </>
    );
}

export default LoginPage;